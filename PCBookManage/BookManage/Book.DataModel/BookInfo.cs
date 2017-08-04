//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Book.DataModel
{
    using System;
    using System.Collections.Generic;
    
    public partial class BookInfo
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public BookInfo()
        {
            this.BookBorrows = new HashSet<BookBorrow>();
            this.BookCollections = new HashSet<BookCollection>();
            this.BookImages = new HashSet<BookImage>();
        }
    
        public long Id { get; set; }
        public string BookName { get; set; }
        public string Author { get; set; }
        public Nullable<System.DateTime> PublicDate { get; set; }
        public string PublicAddress { get; set; }
        public Nullable<int> CategoryId { get; set; }
        public string Remark { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public string CreateBy { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BookBorrow> BookBorrows { get; set; }
        public virtual BookCategory BookCategory { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BookCollection> BookCollections { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BookImage> BookImages { get; set; }
    }
}
