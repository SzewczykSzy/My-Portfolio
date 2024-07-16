import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    id: 1,
    title: "3D point cloud analysis for traffic situational awareness",
    description: "This project is my thesis project: \"3D point cloud analysis for traffic situational awareness\". Project mainly consist of predicting dangerous situations on the road with pedastrians. Data are provided by Ouster OS1 LiDAR.",
    image: "/projects/wynik.gif",
    previewLink: "/projects/1",
    githubLink: "https://github.com/SzewczykSzy/Dangerous-situations-with-pedastrians/tree/main"
  },
  // Add more projects here if needed
];

const ProjectsPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="border rounded-lg shadow-md p-4">
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={200}
              className="rounded-t-lg"
            />
            <div className="p-4">
              <p className="text-md mb-2">{project.description}</p>
              <div className="flex justify-between mt-4">
                <Link href={project.previewLink} legacyBehavior>
                  <a className="border rounded px-4 py-2 hover:bg-gray-200">Project preview</a>
                </Link>
                <a href={project.githubLink} target="_blank" className="border rounded px-4 py-2 hover:bg-gray-200">See on github</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
