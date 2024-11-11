import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import Container from "../components/cont/Container";
import PostCard from "../components/PostCard";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { PenLine, BookOpen, Users, ThumbsUp } from "lucide-react";

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  const features = [
    {
      icon: <PenLine className="w-6 h-6 text-orange-600" />,
      title: "Start Writing",
      description: "Share your thoughts and ideas with the world",
      link: "/add-post",
    },
    
  ];
  const handleStart = () => {
    navigate('/login');
  }

  if (posts.length === 0) {
    return (
      <div className="w-full  ">
        <Container>
          <div className="w-full rounded-xl border-2 border-orange-100 min-h-[80vh] shadow-2xl bg-gradient-to-b from-orange-200 to-orange-200 flex flex-col text-orange-950 items-center justify-start py-12">
            <h1 className="text-5xl p-4 pt-0 md:text-5xl font-bold text-orange-600 text-center mb-4 ">
              Welcome to <span className="text-orange-950">Blog</span>Me
            </h1>
            <p className="text-xl text-orange-400 text-center max-w-xl mb-8">
              Your space to create, share, and discover amazing stories
            </p>

            <div className="grid grid-cols-1 w-[50%]  md:grid-cols-2 lg:grid-cols-1 gap-6  max-w-6xl mb-12">
              {features.map((feature, index) => (
                <Link
                  to={feature.link}
                  key={index}
                  className="group p-6 bg-white rounded-lg shadow-md hover:shadow-lg text-orange-950 transition-all duration-300 border "
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-orange-50 rounded-full group-hover:bg-orange-100 transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center" onClick={handleStart}>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl text-lg font-medium transition-colors duration-300 shadow-xl">
                Start Writing
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 min-h-screen bg-orange-50">
      <Container>
        <h1 className="text-3xl font-semibold text-orange-600 mb-6">
          Latest Posts
        </h1>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-full md:w-1/2 lg:w-1/4" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
