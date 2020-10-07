import { Link } from "@material-ui/core";
import React from "react";
import "./Footer.scss";
function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer__content">
          <div className="footer__content__top">
            <div className="footer__content__top__one">
              <Link>Shipping & Returns</Link>
              <Link>Store Policy</Link>
              <Link>Payment Methods</Link>
            </div>
            <div className="footer__content__top__two">
              <Link>Contact</Link>
              <Link>Tel: 058 2452 653</Link>
              <Link>dtvi2412@gmail.com</Link>
            </div>
            <div className="footer__content__top__three">
              <a
                href="https://www.facebook.com/profile.php?id=100007255540779"
                target="_blank"
              >
                Facebook
              </a>

              <a
                href="https://www.instagram.com/dangthaivi/?hl=vi"
                target="_blank"
              >
                Instagrem
              </a>
              <Link>Pinterest</Link>
            </div>
          </div>
          <div className="footer__content__bottom">
            <div className="footer__content__bottom__content">
              <h1>Join our mailing list and never miss an update</h1>
              <label>Email</label>
              <div className="footer__content__bottom__content__bottom">
                <input placeholder="Email your email here*" />
                <button>Subscribe Now</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="end">
        @2030 by DTV. Proudly created with shop-book.surge.vn
      </div>
    </>
  );
}

export default Footer;
