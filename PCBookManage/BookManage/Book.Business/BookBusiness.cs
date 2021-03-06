﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Book.Business.ConvertModel;
using Book.DataAccess;
using Book.EntityModel;

namespace Book.Business
{
    public class BookBusiness
    {
        private readonly BookAgent _bookAgent;
        private readonly BookBorrowAgent _bookBorrowAgent;
        private readonly BookCollectionAgent _bookCollectionAgent;

        public BookBusiness()
        {
            _bookAgent = new BookAgent();
            _bookBorrowAgent = new BookBorrowAgent();
            _bookCollectionAgent = new BookCollectionAgent();
        }

        /// <summary>
        /// 获取所有图书信息
        /// </summary>
        /// <returns></returns>
        public async Task<MuliResult<BookInfoModel>> GetBookList(string userName, string bookName="", int categoryId=0,int page=1)
        {
            var result = new MuliResult<BookInfoModel>();
            try
            {
                var dataList = await _bookAgent.GetBookList();
                result.Total = (int)Math.Ceiling((decimal)dataList.Count / 20);
                //search paramter
                if (bookName != "")
                {
                    dataList = dataList.Where(x => x.BookName.Contains(bookName)).ToList();
                }
                if (categoryId != 0)
                {
                    dataList = dataList.Where(x => x.CategoryId == categoryId).ToList();
                }

                //disable book item which have been add to the book borrow list
                var bookCollectionList = await _bookCollectionAgent.GetCollectionByUserId(userName);
                foreach (var item in dataList)
                {
                    var existCollect = bookCollectionList.Find(x => x.BookId == item.Id);
                    if (existCollect != null)
                    {
                        item.CanOrder = false;
                    }
                }

                result.Datas = dataList.Select(x => x.ToBookInfoModel())
                    .OrderByDescending(x => x.CanOrder)
                    .ThenBy(x => x.BookName).Skip((page-1) * 20).Take(20)
                    .ToList();
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
            }
            return result;
        }

        /// <summary>
        /// 添加图书
        /// </summary>
        /// <param name="bookInfoModel"></param>
        /// <returns></returns>
        public async Task<Operate> AddOrUpdate(BookInfoModel bookInfoModel)
        {
            var result = new Operate();
            try
            {
                var bookInfo = bookInfoModel.ToBookInfo();
                await _bookAgent.AddOrUpdate(bookInfo);
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task<ViewResult<BookInfoModel>> GetBookById(long id)
        {
            var result = new ViewResult<BookInfoModel>();
            try
            {
                var data = await _bookAgent.GetBookIncludeById(id);
                result.Data = data.ToBookInfoModel();
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
            }
            return result;
        }

        /// <summary>
        /// 借阅图书
        /// </summary>
        /// <param name="bookBorrowModel"></param>
        /// <returns></returns>
        public async Task<Operate> BorrowBook(BookBorrowModel bookBorrowModel)
        {
            var result = new Operate();
            try
            {
                var borrow = bookBorrowModel.ToBookBorrow();

                var hasBorrow = await _bookBorrowAgent.GetBorrowBookByBookId(borrow.BookId);
                if (hasBorrow != null)
                {
                    result.Status = -2;
                    result.Message = "此书已被借阅";
                    return result;
                }

                await _bookBorrowAgent.AddOrUpdate(borrow);
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
            }
            return result;
        }

        /// <summary>
        /// 收藏图书
        /// </summary>
        /// <param name="bookCollectionModel"></param>
        /// <returns></returns>
        public async Task<Operate> CollectBook(BookCollectionModel bookCollectionModel)
        {
            var result = new Operate();
            try
            {
                var collect = bookCollectionModel.ToBookCollection();

                var hasCollect = await _bookCollectionAgent.GetBookCollect(collect.BookId, collect.UserName);
                if (hasCollect != null)
                {
                    result.Status = -2;
                    result.Message = "此书已被添加到借阅车";
                    return result;
                }

                await _bookCollectionAgent.AddOrUpdate(collect);
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
            }
            return result;
        }

        /// <summary>
        /// 查询借阅列表
        /// </summary>
        /// <returns></returns>
        public async Task<MuliResult<BookBorrowModel>> GetBookBorrowListByUserId(string userName)
        {
            var result = new MuliResult<BookBorrowModel>();
            try
            {
                var datalist = await _bookBorrowAgent.GetBookBorrowList(userName);
                result.Datas = datalist.Select(x => x.ToBorrowModel()).ToList();

                //get over return time result
                result.Total = 0;
                foreach (var item in result.Datas)
                {
                    if (item.IsOverTime > 0)
                    {
                        result.Total = result.Total + 1;
                    }
                }
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task<Operate> BookReturn(List<BookBorrowModel> bookReturnModelList)
        {
            var result = new Operate();
            try
            {
                foreach (var item in bookReturnModelList)
                {
                    var borrow = await _bookBorrowAgent.GetBorrowBookById(item.Id);
                    borrow.IsReturn = true;
                    borrow.ReturnDate = DateTime.Now;
                    await _bookBorrowAgent.AddOrUpdate(borrow);
                }
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
            }
            return result;
        }

        /// <summary>
        /// 还书
        /// </summary>
        /// <param name="bookBorrowModel"></param>
        /// <returns></returns>
        public async Task<Operate> BackBook(BookBorrowModel bookBorrowModel)
        {
            var result = new Operate();
            try
            {
                var borrow = await _bookBorrowAgent.GetBorrowById(bookBorrowModel.Id);
                borrow.IsReturn = bookBorrowModel.IsReturn;
                borrow.ReturnDate = bookBorrowModel.ReturnDate;
                await _bookBorrowAgent.AddOrUpdate(borrow);
            }
            catch (Exception ex)
            {
                result.Status = -1;
                result.Message = ex.Message;
            }
            return result;
        }
    }
}
