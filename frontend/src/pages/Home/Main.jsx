import styles from './Main.module.css';
export default function Main() {
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
              Learn skills that you can apply in your life even after your
              subscription
            </h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perspiciatis, labore corrupti necessitatibus
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
