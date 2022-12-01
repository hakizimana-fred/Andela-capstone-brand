const btnScrollTop = document.querySelector('#myBtn')
const contactForm = document.querySelector('#contact-form')
const signupForm = document.querySelector('#signup-form')
const loginForm = document.querySelector('#login-form')
const hamburgerMenu = document.querySelector('.menu-btn')


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
                    alert('Message sent successfully')
                    this.reset() 
                }else {
                    alert('something went wrong')
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

            const newUser = {
                name, 
                email,
                password
            }        

            if (localStorage.getItem('brand-users') === null) {
                email === "hakifred20@gmail.com" ? newUser.role = "admin" : newUser.role = "user"
                brandUsers.push(newUser)
                localStorage.setItem('brand-users', JSON.stringify(brandUsers))
                alert('Registered successfully!')
                window.location.href="/login.html"
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
                alert('Registered successfully!')
                window.location.href="/login.html"
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
            document.querySelector('.warning').classList.remove('show') 
        // Get password stored in local storage 
        const savedUsers = JSON.parse(localStorage.getItem('brand-users'))
        const foundUser = savedUsers.find(user => user.email === email)
        // find out if a user exist 
        if (foundUser) {
            // check if password match
            if (foundUser.password === password) {
                localStorage.setItem('user-loggedin', true)
                if (foundUser.role === "admin") return window.location.href="/admin/index.html"
                return window.location.href="/blog.html"
            }else {
                document.querySelector('.warning').classList.add('show')
                document.querySelector('.warning').innerHTML = "Passwords do not match"
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



