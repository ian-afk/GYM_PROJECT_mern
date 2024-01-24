export default function Main() {
  return (
    <>
      <main>
        <section className="section-about">
          <div className="center-text">
            <h2 className="heading-secondary">
              Exciting Body transformation journey
            </h2>
          </div>
          <div className="row">
            <div className="col-1-of-2">
              <h3 className="heading-tertiary">
                You're going to love the progress
              </h3>
              <p className="paragraph">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
                aliquid laudantium asperiores autem excepturi, harum{' '}
              </p>
              <h3 className="heading-tertiary">
                You will see progress day by day
              </h3>
              <p className="paragraph">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi
                laboriosam, eos totam aspernatur sit odio. Voluptates,{' '}
              </p>
              <a href="#">Learn more &rarr;</a>
            </div>
            <div className="col-1-of-2">
              <div className="composition">
                <img
                  src="/before_after/male.PNG"
                  alt="male1"
                  className="composition__photo composition__photo--p1"
                />
                <img
                  src="/before_after/female.PNG"
                  alt="male1"
                  className="composition__photo composition__photo--p2"
                />
                <img
                  src="/before_after/male2.PNG"
                  alt="male1"
                  className="composition__photo composition__photo--p3"
                />
                <img
                  src="/before_after/female2.PNG"
                  alt="male1"
                  className="composition__photo composition__photo--p4"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
