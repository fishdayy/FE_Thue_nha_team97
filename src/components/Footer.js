import "../page/CSS/footer.css"

const Footer = () => {
    return(
        <>

            <div className="main-footer">
                <div className="container">
                    <hr/>
                    <div className="row">
                        <div className="col">
                            <h4>Support</h4>
                            <ul className="list-unstyled">
                                <li>Help Center</li>
                                <li>Team97Cover</li>
                                <li>Supporting people with disabilities</li>
                                <li>Cancellation options</li>
                                <li>Our COVID-19 Response</li>
                                <li>Report a neighborhood concern</li>
                            </ul>
                        </div>
                        <div className="col">
                            <h4>Community</h4>
                            <ul className="list-unstyled">
                                <li>Team97.org: disaster relief housing</li>
                                <li>Combating discrimination</li>
                            </ul>
                        </div>
                        <div className="col">
                            <h4>Hosting</h4>
                            <ul className="list-unstyled">
                                <li>Team97 your home</li>
                                <li>Team97Cover for Hosts</li>
                                <li>Explore hosting resources</li>
                                <li>Visit our community forum</li>
                                <li>How to host responsibly</li>
                            </ul>
                        </div>
                        <div className="col">
                            <h4>Team97</h4>
                            <ul className="list-unstyled">
                                <li>Newsroom</li>
                                <li>Learn about new features</li>
                                <li>Letter from our founders</li>
                                <li>Careers</li>
                                <li>Investors</li>
                                <li>Gift cards</li>

                            </ul>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <p className="col-sm">
                            &copy;{new Date().getFullYear()} Team97 INC | ALL right reserved | Term Of Service | Privacy
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer;