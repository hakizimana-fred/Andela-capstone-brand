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



document.getElementById('create-post').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'block'
})

document.querySelector('.close').addEventListener("click", () => {
    document.querySelector('.modal').style.display = 'none'
})





const blogForm = document.querySelector('#blog-form')

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
    created: new Date()
}


//localStorage.setItem('admin-blog', JSON.stringify(blogs))

if (localStorage.getItem('admin-blog') ===  null) {
    var blogs = []

    blogs.push(myBlog)
    localStorage.setItem('admin-blog', JSON.stringify(blogs))

}else {
    var blogs = JSON.parse(localStorage.getItem('admin-blog'))
    blogs.push(myBlog)

    localStorage.setItem('admin-blog', JSON.stringify(blogs))

}

    getBlogs()


})



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
            <td><button type="button" class="btn btn-sm btn-primary">
                <i class="fa-solid fa-book-open-reader"></i>
            </button></td>
        <tr>
        `
    })

    tableBody.innerHTML = output
}

const postsCount = document.getElementById('posts-count')

postsCount.innerHTML = JSON.parse(localStorage.getItem('admin-blog')).length


getBlogs()
