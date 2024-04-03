import { useState } from 'react';
import styles from './Main.module.css';
export default function Main() {
  const [contact, setContact] = useState(true);
  return (
    <>
      <main className={styles.main}>
        <section className={styles['section-about']} id="section-about">
          <div className={styles['center-text']}>
            <h2 className={styles['heading-secondary']}>
              Exciting Body transformation journey
            </h2>
          </div>
          <div className={styles['row']}>
            <div className={styles['col-1-of-2']}>
              <h3 className={styles['heading-tertiary']}>
                You&apos;re going to love the progress
              </h3>
              <p className={styles['paragraph']}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
                aliquid laudantium asperiores autem excepturi, harum
              </p>
              <h3 className={styles['heading-tertiary']}>
                You will see progress day by day
              </h3>
              <p className={styles['paragraph']}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi
                laboriosam, eos totam aspernatur sit odio. Voluptates,
              </p>
              <a href="#">Learn more &rarr;</a>
            </div>
            <div className={styles['col-1-of-2']}>
              <div className={styles['composition']}>
                <img
                  src="/before_after/male.PNG"
                  alt="male1"
                  className={`${styles['composition__photo']} ${styles['composition__photo--p1']}`}
                />
                <img
                  src="/before_after/female.PNG"
                  alt="male1"
                  className={`${styles['composition__photo']} ${styles['composition__photo--p2']}`}
                />
                <img
                  src="/before_after/male2.PNG"
                  alt="male1"
                  className={`${styles['composition__photo']} ${styles['composition__photo--p3']}`}
                />
                <img
                  src="/before_after/female2.PNG"
                  alt="male1"
                  className={`${styles['composition__photo']} ${styles['composition__photo--p4']}`}
                />
              </div>
            </div>
          </div>
        </section>
        <section className={styles['section-features']}>
          <div className={styles['features-row']}>
            <div className={styles['cards']}>
              <h3>Lifestyle</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
                aperiam. Eum nulla, reiciendis velit
              </p>
            </div>
            <div className={styles['cards']}>
              <h3>Body Building</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
                aperiam. Eum nulla, reiciendis velit
              </p>
            </div>
            <div className={styles['cards']}>
              <h3>Weight Lifting</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
                aperiam. Eum nulla, reiciendis velit
              </p>
            </div>
            <div className={styles['cards']}>
              <h3>Sports</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
                aperiam. Eum nulla, reiciendis velit
              </p>
            </div>
          </div>
        </section>
        <section className={styles.vision}>
          <div>
            <h2>We bring Clients and Trainers together</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perspiciatis, labore corrupti necessitatibus suscipit ipsum cumque
              rem exercitationem ullam sunt, voluptatum temporibus distinctio.
              Eius deleniti aperiam animi sunt tenetur, quisquam est.
            </p>
          </div>
          <div>
            <h2>
              Learn skills that you can apply in your daily life even when
              you&#39;re not in the gym
            </h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perspiciatis, labore corrupti necessitatibus
            </p>
          </div>
          <div className={styles.skills}>
            <div className={styles.cards}>
              <div>img</div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                nam quaerat rerum
              </p>
              <a href="#">Start Learning &rarr;</a>
            </div>
            <div className={styles.cards}>
              <div>img</div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                nam quaerat rerum
              </p>
              <a href="#">Start Learning &rarr;</a>
            </div>
            <div className={styles.cards}>
              <div>img</div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                nam quaerat rerum
              </p>
              <a href="#">Start Learning &rarr;</a>
            </div>
          </div>
        </section>
        <section className={styles['contact-us']}>
          <div className={styles.contactHeader}>
            <h2>Contact Us</h2>
          </div>
          <div className={styles.contactFormContainer}>
            <div
              className={`${styles.btn} ${styles['btn-contactText']}`}
              onClick={() => setContact(!contact)}
            >
              <span className={contact && styles.btnActive}>Contact Us</span>/
              <span className={!contact && styles.btnActive}>Signup</span>
            </div>
            <div className={styles.contactForm}>
              {contact ? (
                <div className={styles.contactText}>
                  <p>Do you have any question? </p>
                </div>
              ) : (
                <div className={styles.contactText}>
                  Join our environment with your own comfort!
                </div>
              )}
              {contact ? (
                <div className={styles.formContainer}>
                  <div>
                    <h3>Contact Us</h3>
                  </div>
                  <form action="#">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" />
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" />
                    <label htmlFor="email">Email</label>
                    <input type="email" />
                    <label htmlFor="comment">Comment</label>
                    <textarea
                      name="comment"
                      id="comment"
                      cols="30"
                      rows="10"
                    ></textarea>
                    <input type="submit" className={styles.btn} />
                  </form>
                </div>
              ) : (
                <div>
                  <div>
                    <h3>Sigup</h3>
                  </div>
                  <form action="#">
                    <label htmlFor="#">First Name</label>
                    <input type="text" />
                    <label htmlFor="#">Last Name</label>
                    <input type="text" />
                    <label htmlFor="#">Email</label>
                    <input type="email" />
                    <label htmlFor="#">Password</label>
                    <input type="password" />
                    <input type="submit" className={styles.btn} />
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
