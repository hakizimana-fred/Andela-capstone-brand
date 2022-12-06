const btnScrollTop = document.querySelector('#myBtn')
const contactForm = document.querySelector('#contact-form')
const signupForm = document.querySelector('#signup-form')
const loginForm = document.querySelector('#login-form')
const hamburgerMenu = document.querySelector('.menu-btn')
const loggedIn = document.querySelector('.login-user')
const nav = document.querySelector('nav')


if (localStorage.getItem('user-loggedin')) {
    const parentEl = loggedIn.parentNode
    const button = document.createElement('button')
    button.className = 'btn btn-logout'
    const textNode = document.createTextNode('Logout')
    button.addEventListener('click', logout)
    button.appendChild(textNode)
    parentEl.insertBefore(button, loggedIn.nextSibling)
    loggedIn.remove()

}

function logout() {
    localStorage.removeItem('user-loggedin')
    window.location.reload()
}


if (btnScrollTop && btnScrollTop !== "undefined") {
    window.onscroll = function(){scroll()}
}


if (hamburgerMenu && hamburgerMenu !== "undefined") {
    hamburgerMenu.addEventListener('click', () => {
        document.querySelector('.mobile-nav').classList.toggle('show')
    })
}

function scroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ) 
        btnScrollTop.style.display = "block"
    else 
        btnScrollTop.style.display = 'none' 
}


function topFunction() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
}


const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

    // contact form submission
if (contactForm && contactForm !== "undefined") {
     contactForm.addEventListener('submit', async function(e){
            e.preventDefault()
            const [name, email, message] = [
                document.querySelector('#name').value,
                document.querySelector('#email').value,
                document.querySelector('#message').value,
            ]

            //simple validation
            if (!name || !email || !message) {
                   document.querySelector('.warning').classList.add('show')
                  document.querySelector('.warning').innerHTML = "All fields are required" 

                  setTimeout(() => {
                   document.querySelector('.warning').classList.remove('show')
                  }, 2000)
                  return
            }
            if (!validateEmail(email)) {
                  document.querySelector('.warning').classList.add('show')
                  document.querySelector('.warning').innerHTML = "Invalid email" 

                  setTimeout(() => {
                   document.querySelector('.warning').classList.remove('show')
                  }, 2000)
                  return
            }

            const data = new FormData(e.target)
             
            try {
                const response = await fetch('https://formspree.io/f/mlepawbw', {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                })

                if (response.ok) {
                    document.querySelector('.warning').classList.add('show')
                    document.querySelector('.warning').innerHTML = "Message sent successfully" 

                    this.reset() 
                }else {
                    document.querySelector('.warning').classList.add('show')
                    document.querySelector('.warning').innerHTML = "Something went wrong" 

                }

            }catch(err) {
                alert('There was a problem submitting your form')
            }

    })

}

let brandUsers = []

if (signupForm && signupForm !== "undefined") {
        // register form submission
 signupForm.addEventListener('submit', async function(e){
            e.preventDefault()
            const [name, email, password] = [
                document.querySelector('#name').value,
                document.querySelector('#email').value,
                document.querySelector('#password').value,
            ]
            //simple validation
            if (!name || !email || !password) {
                  document.querySelector('.warning').classList.add('show')
                  document.querySelector('.warning').innerHTML = "All fields are required" 
                return
            }

             if (!validateEmail(email)) {
                  document.querySelector('.warning').classList.add('show')
                  document.querySelector('.warning').innerHTML = "Invalid email" 

                  setTimeout(() => {
                   document.querySelector('.warning').classList.remove('show')
                  }, 2000)
                  return
            }

            const newUser = {
                name, 
                email,
                password,
                userId: Math.random().toString(36).substring(2,10),
            }        

            if (localStorage.getItem('brand-users') === null) {
                email === "hakifred20@gmail.com" ? newUser.role = "admin" : newUser.role = "user"
                brandUsers.push(newUser)
                localStorage.setItem('brand-users', JSON.stringify(brandUsers))

                const userLoggedIn = {
                    ...newUser,
                    isLoggedIn: true
                }
               
                localStorage.setItem('user-loggedin', true)
                localStorage.setItem('loggedin-user', JSON.stringify(userLoggedIn))
                email === "hakifred20@gmail.com" ? window.location.href="/admin/index.html" : window.location.href="/blog.html"
            }else {
                brandUsers = JSON.parse(localStorage.getItem('brand-users'))
                email === "hakifred20@gmail.com" ? newUser.role = "admin" : newUser.role = "user"
                // loop through users to see if user already exists
                for (let user of brandUsers) {
                    if (user.email === email) {
                           document.querySelector('.warning').classList.add('show')
                            document.querySelector('.warning').innerHTML = "User already exists"
                            setTimeout(() => { 
                            document.querySelector('.warning').classList.remove('show')
                          }, 2000)
                        return false
                    }

                } 
                brandUsers.push(newUser)
                localStorage.setItem('brand-users', JSON.stringify(brandUsers))
                const userLoggedIn = {
                    ...newUser,
                    isLoggedIn: true
                }
                 localStorage.setItem('user-loggedin', true)
                 localStorage.setItem('loggedin-user', JSON.stringify(userLoggedIn))
                 email === "hakifred20@gmail.com" ? window.location.href="/admin/index.html" : window.location.href="/blog.html"
            } 
})
}

if (loginForm && loginForm !== "undefined") {
    loginForm.addEventListener('submit', async function(e){
            e.preventDefault()
            const [email, password] = [
                document.querySelector('#email').value,
                document.querySelector('#password').value,
            ]
            //simple validation
            if (!email || !password) {
                document.querySelector('.warning').classList.add('show')
                document.querySelector('.warning').innerHTML = "All fields are required" 
                return
            }
             if (!validateEmail(email)) {
                  document.querySelector('.warning').classList.add('show')
                  document.querySelector('.warning').innerHTML = "Invalid email" 

                  setTimeout(() => {
                   document.querySelector('.warning').classList.remove('show')
                  }, 2000)
                  return
            }


            document.querySelector('.warning').classList.remove('show') 
        // Get password stored in local storage 
        const savedUsers = JSON.parse(localStorage.getItem('brand-users'))
        const foundUser = savedUsers.find(user => user.email === email)
        // find out if a user exist 
        if (foundUser) {
            // check if password match
            if (foundUser.password === password) {
                const {name, email, userId} = foundUser
                const userLoggedIn = {
                    name,
                    email, 
                    userId,
                    isLoggedIn: true
                }
                localStorage.setItem('user-loggedin', true)
                localStorage.setItem('loggedin-user', JSON.stringify(userLoggedIn))

                if (foundUser.role === "admin") return window.location.href="/admin/index.html"
                return window.location.href="/blog.html"
            }else {
                document.querySelector('.warning').classList.add('show')
                document.querySelector('.warning').innerHTML = "Invalid credentials"
                setTimeout(() => { 
                    document.querySelector('.warning').classList.remove('show')
                }, 2000)
            }
        }else {
                document.querySelector('.warning').classList.add('show')
                document.querySelector('.warning').innerHTML = "User does  not exist"
                  setTimeout(() => { 
                    document.querySelector('.warning').classList.remove('show')
                }, 2000)
        } 
})

}



