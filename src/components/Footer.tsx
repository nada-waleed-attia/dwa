import styles from "./Footer.module.css";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dgolhybek';
const cld = (path: string) => `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto/dwam-website${path}`;

export default function Footer() {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <div className={styles.footerBrand}>
              <a
                href="https://dwam-tech.com/259-2/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={cld("/dwam.webp")}
                  alt="شعار دوام"
                  className={styles.brandLogo}
                />
              </a>
              <div className={styles.socialContainer}>
                <ul className={styles.socialLinks}>
                  <li>
                    <a
                      href="https://www.facebook.com/DwamITA"
                      className={styles.socialIcon}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/dwamita/"
                      className={styles.socialIcon}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://x.com/DwamITA"
                      className={styles.socialIcon}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/@dwamita"
                      className={styles.socialIcon}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/DwamITA"
                      className={styles.socialIcon}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tiktok.com/@dwamita"
                      className={styles.socialIcon}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-tiktok"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.behance.net/dwamita"
                      className={styles.socialIcon}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-behance"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/201555855857"
                      className={styles.socialIcon}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-whatsapp"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.footerContact}>
              <h3>أين تجدنا</h3>
              <ul className={styles.linksList}>
                <li>
                  <a
                    href="https://www.dawamtech.com"
                    className={styles.linkItem}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className={styles.contactItem}>
                      <div className={styles.iconAccent}>
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div className={styles.contactText}>
                        <strong>:العنوان</strong>
                        <span>
                          جمهورية مصر العربية - محافظة الإسماعيلية – حي
                          الزهور – المنطقة التاسعة ب – عمارة 4 مدخل أ
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@dawamtech.com"
                    className={styles.linkItem}
                  >
                    <div className={styles.contactItem}>
                      <div className={styles.iconAccent}>
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div className={styles.contactText}>
                        <strong>:الإيميل</strong>
                        <span>info@dawamtech.com</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.dawamtech.com"
                    className={styles.linkItem}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className={styles.contactItem}>
                      <div className={styles.iconAccent}>
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div className={styles.contactText}>
                        <strong>:وكلائنا</strong>
                        <div className={styles.agents}>
                          <div>السعودية</div>
                          <div>الكويت</div>
                          <div>إندونيسيا</div>
                          <div>كندا</div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.footerLinks}>
              <h3>روابط مهمة</h3>
              <ul className={styles.linksList}>
                <li>
                  <a
                    href="/about/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.simpleLink}
                  >
                    من نحن
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.simpleLink}>
                    المجلة
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.simpleLink}>
                    أعمالنا البرمجية
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.simpleLink}>
                    أعمال التصميم
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.simpleLink}>
                    أعمال الفيديو
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.simpleLink}>
                    سياسة الخصوصية
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.simpleLink}>
                    الشروط والأحكام
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.footerLinks}>
              <h3>تواصل معنا</h3>
              <ul className={styles.linksList}>
                <li>
                  <a href="tel:+201555855857" className={styles.linkItem}>
                    <div className={styles.contactItem}>
                      <div className={styles.iconAccent}>
                        <i className="fas fa-phone-alt"></i>
                      </div>
                      <div className={styles.contactText}>
                        <strong> :الخط الساخن</strong>
                        <span>(+2) 01555855857</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="tel:+201226099886" className={styles.linkItem}>
                    <div className={styles.contactItem}>
                      <div className={styles.iconAccent}>
                        <i className="fas fa-phone-alt"></i>
                      </div>
                      <div className={styles.contactText}>
                        <strong> :الدعم الفني</strong>
                        <span>(+2) 01226099886</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="tel:+1-929-243-9722" className={styles.linkItem}>
                    <div className={styles.contactItem}>
                      <div className={styles.iconAccent}>
                        <i className="fas fa-phone-alt"></i>
                      </div>
                      <div className={styles.contactText}>
                        <strong> :التواصل الدولي</strong>
                        <span>+1-929-243-9722</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="tel:+201022501043" className={styles.linkItem}>
                    <div className={styles.contactItem}>
                      <div className={styles.iconAccent}>
                        <i className="fas fa-phone-alt"></i>
                      </div>
                      <div className={styles.contactText}>
                        <strong> :الإستشارات التقنية</strong>
                        <span>(+2)01022501043</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="tel:+064-3207490" className={styles.linkItem}>
                    <div className={styles.contactItem}>
                      <div className={styles.iconAccent}>
                        <i className="fas fa-phone-alt"></i>
                      </div>
                      <div className={styles.contactText}>
                        <strong>:تليفاكس</strong>
                        <span>064-3207490</span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@dawamtech.com"
                    className={styles.linkItem}
                  >
                    <div className={styles.contactItem}>
                      <div className={styles.iconAccent}>
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div className={styles.contactText}>
                        <strong>:الإيميل</strong>
                        <span>info@dawamtech.com</span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.copyrightBar}>
        <div className={styles.container}>
          <div className={styles.copyrightInner}>
            <p className={styles.copyrightText}>
              <a
                href="https://dwam-tech.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={cld("/dwam.webp")}
                  alt="شعار دوام"
                  className={styles.copyrightLogo}
                />
              </a>
              ®جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
