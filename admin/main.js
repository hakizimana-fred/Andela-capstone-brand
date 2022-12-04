let myEditor


      ClassicEditor
                                .create( document.querySelector( '#editor' ) )
                                .then( editor => {
                                        console.log( editor.value);
                                        myEditor = editor

                                } )
                                .catch( error => {
                                        console.error( error );
                                } );



let updateEditor


      ClassicEditor
                                .create( document.querySelector( '#update-editor' ) )
                                .then( editor => {
                                        console.log( editor.value);
                                        updateEditor = editor

                                } )
                                .catch( error => {
                                        console.error( error );
                                } );



document.getElementById('create-post').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'block'
})

document.querySelector('.close').addEventListener("click", () => {
    document.querySelector('.modal').style.display = 'none'
})

document.querySelector('.update-close').addEventListener("click", () => {
    document.querySelector('.update-modal').style.display = 'none'
})



const blogForm = document.querySelector('#blog-form')
const blogImg = document.querySelector('#blog-img')
const update = document.querySelector('#update-form')

let blogimgUrl = ''

blogImg.addEventListener('change', () => {
    const fr = new FileReader()
    fr.readAsDataURL(blogImg.files[0])

    fr.addEventListener('load', () => {
        const url = fr.result
        blogimgUrl = url
    })
})



blogForm.addEventListener('submit', (e) => {
  e.preventDefault()

const title = document.getElementById('title').value
const author = document.getElementById('author').value
const htmlParsed =  myEditor.getData().replace(/<\/?[^>]+(>|$)/g, "")

// save to locastorage

const myBlog = {
    title,
    author,
    content: htmlParsed,
    created: new Date().toISOString().substring(0,10),
    blogId: Math.random().toString(36).substring(2,10),
    imgUrl: blogImg !== '' ? blogimgUrl : null
}


//localStorage.setItem('admin-blog', JSON.stringify(blogs))
let blogs = []

if (localStorage.getItem('admin-blog') ===  null) {
    blogs.push(myBlog)
    localStorage.setItem('admin-blog', JSON.stringify(blogs))

}else {
     blogs = JSON.parse(localStorage.getItem('admin-blog'))
     blogs.push(myBlog)
     localStorage.setItem('admin-blog', JSON.stringify(blogs))

}
    // call getBlogs function after save
    getBlogs()
    getBlogsLength()
})

function getUsersLength() {
    return document.querySelector('#users-length').innerHTML = JSON.parse(localStorage.getItem('brand-users')).length
}

getUsersLength()


function getBlogs() {
    const tableBody = document.querySelector('#table-body')

    // fetch blogs
    const postedBlogs = localStorage.getItem('admin-blog')

    const savedBlogs = postedBlogs ? JSON.parse(postedBlogs): []
    const tr = document.createElement('tr')
    console.log(savedBlogs, 'my saved')

    let output = ''  
    savedBlogs.forEach(blog => {
        output += `
        <tr>
             <td>${blog.title}</td>
            <td>${blog.author}</td>
            <td>${blog.created}</td>
            <td><button id=${blog.blogId} onclick="viewBlog(this)" type="button" class="btn btn-sm btn-primary">
                <i class="fa-solid fa-book-open-reader"></i>
            </button></td>
             <td><button id=${blog.blogId} type="button" class="btn btn-sm btn-primary"  onclick="deleteBlog(this)">
                <i class="fa-solid fa-trash"></i>
                
            </button></td>
              <td><button id=${blog.blogId} onclick="updateBlog(this)" type="button" class="btn btn-sm btn-primary">
                <i class="fa-solid fa-pencil"></i>
            </button></td>
        <tr>
        `
    })

    tableBody.innerHTML = output
}

const postsCount = document.getElementById('posts-count')

function getBlogsLength(){
    return postsCount.innerHTML = JSON.parse(localStorage.getItem('admin-blog')).length
}

getBlogs()
getBlogsLength()


function deleteBlog(e) {
    alert("are you sure you sure?")
    const blogId = e.id
    const blogPosts = JSON.parse(localStorage.getItem('admin-blog'))
    const deleted = blogPosts.filter(blog => blog.blogId !== blogId) 
    localStorage.setItem('admin-blog', JSON.stringify(deleted))
    getBlogs()    
    getBlogsLength()
}


function updateBlog(e) {
    const blogId = e.id
    document.querySelector('.update-modal').style.display = 'block' 
    const blogPosts = JSON.parse(localStorage.getItem('admin-blog')) 

    update.addEventListener('submit', (e) => {
        e.preventDefault()
        const title = document.getElementById('update-title').value
        const author = document.getElementById('update-author').value  
        const htmlParsed =  updateEditor.getData().replace(/<\/?[^>]+(>|$)/g, "")
        const objIndex = blogPosts.findIndex((blog => blog.blogId == blogId));
        blogPosts[objIndex].title = title
        blogPosts[objIndex].author = author
        blogPosts[objIndex].content = htmlParsed
        localStorage.setItem('admin-blog', JSON.stringify(blogPosts))
         getBlogs()

    })
}


function viewBlog(e) {
    const blogId = e.id
    window.location.href=`../articles.html?id=${blogId}`

}


