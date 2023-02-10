using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseAPIController
    {   
    
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUser()
        {
            var users = _context.Users.ToListAsync();

            return await users;

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> Getuser(int id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}