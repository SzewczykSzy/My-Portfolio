"use client";

import { useParams } from 'next/navigation';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: "3D point cloud analysis for traffic situational awareness",
    description: "This project is my thesis project: \"3D point cloud analysis for traffic situational awareness\". Project mainly consist of predicting dangerous situations on the road with pedastrians. Data are provided by Ouster OS1 LiDAR.",
    details: "The goal of this thesis project was to design an algorithm that performs detection of dangerous situations...",
    technologies: ["Python", "Numpy", "Open-cv", "Ouster-sdk", "Roboflow", "YOLOv8", "Kalman Filter", "Ultralytics"],
    image: "/projects/wynik.gif",
    video: "/project-video.mp4",
    githubLink: "#",
    documentationLink: "#"
  },

];

const ProjectDetailsPage = () => {
  const params = useParams();
  const { id } = params;
  const project = projects.find((p) => p.id === parseInt(id as string));

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">{project.title}</h1>
      <div className="mb-8">
        <Image
          src={project.image}
          alt={project.title}
          width={800}
          height={400}
          className="rounded-lg"
        />
      </div>
      <div className="mb-8">
        <p>{project.details}</p>
        <video controls className="w-full mt-4">
          <source src={project.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Technologies Used</h2>
        <ul className="list-disc list-inside mt-2">
          {project.technologies.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between">
        <a href={project.githubLink} className="border rounded px-4 py-2 hover:bg-gray-200">See on github</a>
        <a href={project.documentationLink} className="border rounded px-4 py-2 hover:bg-gray-200">Documentation</a>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
