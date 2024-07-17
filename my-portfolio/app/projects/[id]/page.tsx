"use client";

import { useParams } from 'next/navigation';
import Image from 'next/image';
import projects from '../data/projectsData'; // Adjusted import path

const ProjectDetailsPage = () => {
  const params = useParams();
  const { id } = params;
  const project = projects.find((p) => p.id === parseInt(id as string));

  if (!project) {
    return <div>Project not found</div>;
  }

  const isVideo = project.finalMedia.src.endsWith('.mp4');

  return (
    <div className="container mx-auto pt-5 text-center max-w-screen-lg px-8">
      <h1 className="fw-light font-bold pb-5">{project.title}</h1>
      {project.details.map((detail, index) => (
        <div key={index} className="clearfix mb-5">
          <div className={`float-${index % 2 === 0 ? 'end' : 'start'} mb-3 ms-md-3`}>
            <Image
              src={detail.image}
              alt={`Detail ${index + 1}`}
              width={400}
              height={200}
              className="detailed-image"
            />
          </div>
          <p className="lead text-muted py-2" style={{ textAlign: 'left' }}>{detail.text}</p>
        </div>
      ))}
      <div className="video-container">
        <h4>{project.finalMedia.description}</h4>
        {isVideo ? (
          <video controls className="w-full mt-4" style={{ maxWidth: '800px', maxHeight: '400px' }}>
            <source src={project.finalMedia.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div style={{ maxWidth: '800px', maxHeight: '400px' }}>
            <img
              src={project.finalMedia.src}
              alt="Final media"
              className="img-fluid mb-3 px-5 rounded"
              style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            />
          </div>
        )}
      </div>
      <div className="container d-flex justify-content-center pt-5 pb-5">
        <a className="align-items-end mr-5 px-4" target="_blank" href={project.githubLink}>
          <button type="button" className="btn btn-outline-dark">See on github ...</button>
        </a>
        <a className="align-items-end mr-5 px-4" target="_blank" href={project.documentationLink}>
          <button type="button" className="btn btn-outline-dark">Documentation ...</button>
        </a>
      </div>
      <hr className="my-8" />
      <div className="container py-5">
          <h4 className="text-left ml-2 font-bold">Technologies Used</h4>
          <div className="flex flex-wrap gap-4 mt-8 ml-4">
              {project.technologies.map((tech, index) => (
                  <div key={index} className="bg-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700">
                      {tech}
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
