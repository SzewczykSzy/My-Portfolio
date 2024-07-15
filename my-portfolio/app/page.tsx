import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    id: 1,
    title: "Project 1",
    description: "This project is my thesis project: \"3D point cloud analysis for traffic situational awareness\". Project mainly consist of predicting dangerous situations on the road with pedestrians. Data are provided by Ouster OS1 LiDAR.",
    image: "/projects/wynik.gif",
    previewLink: "/projects/1",
    githubLink: "#"
  },
  {
    id: 2,
    title: "Project 2",
    description: "This project is my thesis project: \"3D point cloud analysis for traffic situational awareness\". Project mainly consist of predicting dangerous situations on the road with pedestrians. Data are provided by Ouster OS1 LiDAR.",
    image: "/projects/wynik.gif",
    previewLink: "/projects/2",
    githubLink: "#"
  },
  {
    id: 3,
    title: "Project 3",
    description: "This project is my thesis project: \"3D point cloud analysis for traffic situational awareness\". Project mainly consist of predicting dangerous situations on the road with pedestrians. Data are provided by Ouster OS1 LiDAR.",
    image: "/projects/wynik.gif",
    previewLink: "/projects/3",
    githubLink: "#"
  }
];

const Home = () => {
  return (
    <div className="container mx-auto p-8">
      {/* Introduction Section */}
      <section className="flex flex-col md:flex-row items-center md:items-start mb-8">
        <Image
          src="/profile-picture.jpg"
          alt="Profile Picture"
          className="rounded-lg md:mr-8"
          width={150}
          height={200}
        />
        <div className="text-center md:text-left mt-4 md:mt-0">
          <h1 className="text-3xl font-bold">Hi, I am Szymon! 👋</h1>
          <p className="text-lg mt-2">
            I am a 4th-year student of Automation and Robotics with a specialization in Computer Science in Control and Management at the AGH University of Science and Technology in Krakow. My interests primarily lie in fields related to Data Science and Operational Research. This website hosts my portfolio and showcases more of my work.
          </p>
          <p className="text-lg mt-2">
            Check out my <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500">CV</a> for more information, or explore the following sections:
          </p>
          <ul className="list-disc list-inside text-left mt-4 space-y-2">
            <li>
              Learn more <Link href="/about" legacyBehavior><a className="text-blue-500">About Me</a></Link> and my background.
            </li>
            <li>
              Discover my recent <Link href="/projects" legacyBehavior><a className="text-blue-500">Projects</a></Link>, including those related to data science and automation.
            </li>
            <li>
              View my <Link href="/stats" legacyBehavior><a className="text-blue-500">Stats</a></Link> from GitHub, HackerRank, Kaggle, and other platforms showcasing my skills and achievements.
            </li>
          </ul>
        </div>
      </section>

      <hr className="my-8" />

      {/* Projects Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Example Projects</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="border rounded-lg p-4 shadow-md">
              <div className="relative" style={{ width: '100%', height: '200px' }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  className="rounded-t-lg"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="mt-4">{project.description}</p>
              <div className="flex justify-between mt-4">
                <Link href={project.previewLink} legacyBehavior>
                  <a className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Project preview</a>
                </Link>
                <a href={project.githubLink} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">See on github</a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/projects" legacyBehavior>
            <a className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">See more projects ...</a>
          </Link>
        </div>
      </section>

      <hr className="my-8" />

      {/* Skills Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div className="flex flex-col items-center text-center">
              <Image src="/icons/python.svg" alt="Python" width={64} height={64} />
              <p className="mt-2 font-semibold">Python</p>
              <p className="text-sm text-gray-600">Advanced: Numpy, Pandas, Matplotlib</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image src="/icons/html-css.svg" alt="HTML/CSS" width={64} height={64} />
              <p className="mt-2 font-semibold">HTML/CSS</p>
              <p className="text-sm text-gray-600">Intermediate</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image src="/icons/c-plus-plus.svg" alt="C/C++" width={64} height={64} />
              <p className="mt-2 font-semibold">C/C++</p>
              <p className="text-sm text-gray-600">Basics</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image src="/icons/databases.svg" alt="Databases" width={64} height={64} />
              <p className="mt-2 font-semibold">Databases</p>
              <p className="text-sm text-gray-600">Relational: MySQL, SQLite, PostgreSQL</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image src="/icons/web-framework.svg" alt="Web app framework" width={64} height={64} />
              <p className="mt-2 font-semibold">Web app framework</p>
              <p className="text-sm text-gray-600">Intermediate: Flask</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image src="/icons/language.svg" alt="Language" width={64} height={64} />
              <p className="mt-2 font-semibold">Language</p>
              <p className="text-sm text-gray-600">Polish: Native<br />English: B2</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image src="/icons/microsoft-office.svg" alt="Microsoft Office" width={64} height={64} />
              <p className="mt-2 font-semibold">Microsoft Office</p>
              <p className="text-sm text-gray-600">Intermediate</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image src="/icons/machine-learning.svg" alt="Machine learning" width={64} height={64} />
              <p className="mt-2 font-semibold">Machine learning</p>
              <p className="text-sm text-gray-600">SKLearn, TensorFlow</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image src="/icons/ci-cd.svg" alt="CI/CD" width={64} height={64} />
              <p className="mt-2 font-semibold">CI/CD</p>
              <p className="text-sm text-gray-600">GitHub Actions</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image src="/icons/git.svg" alt="Git" width={64} height={64} />
              <p className="mt-2 font-semibold">Git</p>
              <p className="text-sm text-gray-600">Version Control System</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
