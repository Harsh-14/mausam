import React from "react";
import "../css/Footer.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const Footer = () => {
  return (
   <section id="footer">
   <div className="container">
      <div className="row">
         <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
            <ul className="list-unstyled list-inline social text-center">
               <li className="list-inline-item"><a href="https://www.facebook.com/profile.php?id=100022558933152" target="_blank"><i className="fa fa-facebook"></i></a></li>
               <li className="list-inline-item"><a href="#" target="_blank"><i className="fa fa-twitter"></i></a></li>
               <li className="list-inline-item"><a href="https://www.github.com/Harsh-14" target="_blank"><i className="fa fa-github"></i></a></li>
               <li className="list-inline-item"><a href="https://instagram.com/harsh____14?utm_medium=copy_link" target="_blank"><i className="fa fa-instagram"></i></a></li>
               <li className="list-inline-item"><a href="#" target="_blank"><i className="fa fa-envelope"></i></a></li>
            </ul>
         </div>
         <hr/>
      </div>	
      <div className="row">
         <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
            <p className="h5">© All right Reversed. <a className="text-green ml-2" href="https://www.github.com/Harsh-14" target="_blank">Harsh</a></p>
         </div>
         <hr/>
      </div>	
   </div>
</section>
  );
};

export default Footer;
