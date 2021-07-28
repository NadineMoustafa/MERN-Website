var Investor = (
    <div>
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark" >
<             button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
            </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar" >
                <ul class="navbar-nav nav-fill w-100">
                    <li class="nav-item" color="white" >
                        <i className="fa fa-edit" style={{color:blue100}}/>
                        <a class="nav-link" href='/editprofile' >Edit your profile</a>
                    </li>
                    <li class="nav-item">
                        <i className="fa fa-key" style={{color:blue100}}/>
                        <a class="nav-link"  href='/changepassword' >Change your password</a>
                    </li>
                    <li class="nav-item">
                        <i className="fa fa-user" style={{color:blue100}}/>
                        <a class="nav-link"  href='/profileI' >Show Profile</a>
                    </li>
                    <li class="nav-item">
                        <i className="far fa-building" style={{color:blue100}}/>
                        <a class="nav-link"  href='/approvedCompanies'>Show Approved Companies</a>
                    </li>
                    <li class="nav-item">
                        <i className="far fa-list-alt" style={{color:blue100}}/>
                        <a class="nav-link"  href='/showsscform'>Track your forms</a>
                    </li>   
                    <li class="nav-item">
                        <i className="fa fa-building" style={{color:blue100}}/>
                        <a class="nav-link"  href='/form'>Create a company</a>
                    </li>    
                </ul>
            </div>  
        </nav>
    </div>
    
    );