import "./First.css"
import {useNavigate} from 'react-router-dom'


export default function First() {
    const navigation = useNavigate()

    return (
        <>
            <header id="head">
                <h1 id="title">COLLEGE PLACEMENT PORTAL</h1>
                <h4>Home</h4>
            </header>
            <center><section id="section1">
                <p id="heading">Find Your Dream Job or Discover Top Talent</p>
                <p id="sub-heading">College placements are a crucial phase in a student’s academic journey, serving as a bridge between education and professional life. Organized by institutions, these programs connect students with companies seeking fresh talent for various roles across industries. </p>
            </section></center>
            <img id="background-image" src="college.jpg" />
            <div id="options">
                <button onClick={()=>navigation('/login')}>Student</button>
                <button onClick={()=>navigation('/companylogin')}>Company</button>
            </div>
            <div>
            <footer>
    <div>
        <div>
            <h4>About Us</h4>
            <p>We connect job seekers with top employers, helping both achieve their goals. Start your career journey or find the perfect candidate today!</p>
        </div>

        <div>
            <h4>Quick Links</h4>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Browse Jobs</a></li>
                <li><a href="#">Post a Job</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </div>

        <div>
            <h4>Contact Us</h4>
            <p>Email: support@jobportal.com</p>
            <p>Phone: +1 (123) 456-7890</p>
            <p>Address: 123 Job Street, Career City, Jobland</p>
        </div>

        <div>
            <h4>Follow Us</h4>
            <div>
                <a href="https://facebook.com" target="_blank">Facebook</a>
                <a href="https://twitter.com" target="_blank">Twitter</a>
                <a href="https://linkedin.com" target="_blank">LinkedIn</a>
            </div>
        </div>
    </div>

    <hr />
    <p>&copy; 2024 JobPortal Inc. All rights reserved.</p>
</footer>

            </div>
        </>
    )
}