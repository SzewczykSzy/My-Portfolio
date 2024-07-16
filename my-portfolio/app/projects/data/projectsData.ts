// data/projectsData.ts

const projects = [
    {
      id: 1,
      title: "3D point cloud analysis for traffic situational awareness",
      image: "/projects/project_1/wynik.gif",
      description: "This project is my thesis project: \"3D point cloud analysis for traffic situational awareness\". Project mainly consist of predicting dangerous situations on the road with pedastrians. Data are provided by Ouster OS1 LiDAR.",
      details: [
        {
          text: "The goal of this thesis project was to design an algorithm that performs detection of dangerous situations involving pedestrians on the road. For this problem, 3D point clouds acquired from a vehicle-mounted LiDAR device (Ouster OS1-128) were used. The OS1-128 is a time-of-flight (ToF) sensor. This means that it measures distance based on the time-of-flight of a light beam. The device emits light which bounces off the measured object and returns to it. Using software provided by the Ouster manufacturer, the raw data was converted to an array representation.",
          image: "/projects/project_1/image1.png"
        },
        {
          text: "After converting point cloud to array representation, the result image was not natural. It needed to be converted from stage to destagger. Also it required scaling, because reflective objects and those which emits light on their own, return signal incomparably large relative to other facilities.",
          image: "/projects/project_1/image2.png"
        },
        {
          text: "When the data were transformed correctly, the next step was to create a dataset with annotated pedestrians. To do that I used Roboflow. I have created dataset with about 1300 images, and after augmentation process increased to about 3000 images.",
          image: "/projects/project_1/image3.png"
        },
        {
          text: "To perform pedestrian detection in the images, I have decided to use a pre-trained YOLOv8 convolutional neural network, which was retrained on the previously created dataset. After the model was ready to use, to perform object tracking I have used a ByteTrack algorithm, which was provided by Ultralytics with default parameters values.",
          image: "/projects/project_1/image4.png"
        },
        {
          text: "Then I have chosen a center of bounding box to representing point of pedestrian. Data used in computer vision are noisy so I used Kalman Filter implemented in FilterPy library to filter them. Now it’s time to create algorithm which decide if the car should stop immediately, slow down, be careful or just go ahead. The criterion based primarily on which the algorithm makes its prediction is the relative speed of the detected pedestrian. Algorithm based on two consecutive frames calculate (KalmanFilter) the X and Y velocity vector and check whether it crosses the safety area or not. Based on that data I created a sort of decision tree, which return the result.",
          image: "/projects/project_1/image5.png"
        }
      ],
      finalMedia: {
        description: "The result video is shown below:",
        type: "video",
        src: "/projects/project_1/wynik.gif"
      },
      githubLink: "https://github.com/SzewczykSzy/Dangerous-situations-with-pedastrians/tree/main",
      documentationLink: "https://szewczykszy.github.io/Dangerous-situations-with-pedastrians/"
    },
    // Add more projects here if needed
  ];
  
  export default projects;
  