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
                alert("All fieds are required")
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
                alert("All fieds are required")
                return
            }

            const newUser = {
                name, 
                email,
                password
            }
        
        // check if user exists
        const savedUser = JSON.parse(localStorage.getItem('mybrand')) || {}
        if (savedUser.email === email) {
            alert('user already exists')
            window.location.href ="/login.html"
        }else {
            // Set user hakifred20@gmail.com as Admin
            email === "hakifred20@gmail.com" ? newUser.role = "admin" : newUser.role = "user"
            localStorage.setItem('mybrand', JSON.stringify(newUser))
            alert('Registered successfully')
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
                alert("All fieds are required")
                return
            }
       
        // Get password stored in local storage
        const savedUser = JSON.parse(localStorage.getItem('mybrand')) || {}
        if (savedUser && savedUser.password === password) {
            // check if it's user is admin
            if (savedUser.role === "admin")  {
                window.location.href="/admin/index.html"
            }else {
                window.location.href="/blog.html"
            }
        }else {
            alert("passwords don't match")
        }      
})

}



