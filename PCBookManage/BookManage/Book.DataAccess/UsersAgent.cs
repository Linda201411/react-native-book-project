﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Book.DataModel;

namespace Book.DataAccess
{
    public class UsersAgent
    {
        public async Task Register(User user)
        {
            using (var context=new BookProjectEntities())
            {
                context.Users.AddOrUpdate(user);
                await context.SaveChangesAsync();
            }
        }

        public async Task<User> FindUser(string userName)
        {
            using (var context=new BookProjectEntities())
            {
                return await context.Users.FirstOrDefaultAsync(x => x.UserName == userName);
            }
        } 
    }
}
