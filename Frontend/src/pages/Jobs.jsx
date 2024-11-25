import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../Store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(fetchJobs(city, niche, searchKeyword));
  }, [dispatch, error, city, niche, searchKeyword]);

  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
  };

  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
  };

  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  };

  const filteredJobs = jobs.filter((job) => {
    const matchCity = selectedCity
      ? job.location.toLowerCase().includes(selectedCity.toLowerCase())
      : true;
    const matchNiche = selectedNiche
      ? job.niche.toLowerCase().includes(selectedNiche.toLowerCase())
      : true;
    const matchSearchKeyword = searchKeyword
      ? job.title.toLowerCase().includes(searchKeyword.toLowerCase())
      : true;
    return matchCity && matchNiche && matchSearchKeyword;
  });

  const cities = [
    "Mumbai",
    "Pune",
    "Delhi",
    "Bengaluru",
    "Kolkata",
    "Chennai",
    "Patna",
    "Hyderabad",
    "Chandigarh",
    "Gurgaon",
    "Noida",
    "Ahmedabad",
    "Trivandrum",
    "Lucknow",
    "Mysore",
    "Coimbatore",
    "Indore",
    "Bhopal",
    "Nagpur",
    "Jaipur",
    "Bhubaneswar",
    "Vijayawada",
    "Kochi",
    "Visakhapatnam",
  ];

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  return (
    <>
       (
        <section className="jobs">
          <div className="search-tab-wrapper">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="search-input"
              
            />
            <FaSearch onClick={filteredJobs} />
          </div>

          <div className="wrapper">
            <div className="filter-bar">
              <div className="cities">
                <h2>Filter Job By City</h2>
                {cities.map((city, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={city}
                      name="city"
                      value={city}
                      checked={selectedCity === city}
                      onChange={() => handleCityChange(city)}
                    />
                    <label htmlFor={city}>{city}</label>
                  </div>
                ))}
              </div>

              <div className="niches">
                <h2>Filter Job By Niche</h2>
                {nichesArray.map((niche, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={niche}
                      name="niche"
                      value={niche}
                      checked={selectedNiche === niche}
                      onChange={() => handleNicheChange(niche)}
                    />
                    <label htmlFor={niche}>{niche}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="container">
              <div className="mobile-filter">
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">Filter By City</option>
                  {cities.map((city, index) => (
                    <option value={city} key={index}>
                      {city}
                    </option>
                  ))}
                </select>

                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                >
                  <option value="">Filter By Niche</option>
                  {nichesArray.map((niche, index) => (
                    <option value={niche} key={index}>
                      {niche}
                    </option>
                  ))}
                </select>
              </div>

              <div className="jobs_container">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((element) => (
                    <div className="card" key={element._id}>
                      <p
                        className={
                          element.hiringMultipleCandidates === "Yes"
                            ? "hiring-multiple"
                            : "hiring"
                        }
                      >
                        {element.hiringMultipleCandidates === "Yes"
                          ? "Hiring Multiple Candidates"
                          : "Hiring"}
                      </p>
                      <p className="title">{element.title}</p>
                      <p className="company">{element.companyName}</p>
                      <p className="location">{element.location}</p>
                      <p className="salary">
                        <span>Salary:</span> Rs. {element.salary}
                      </p>
                      <p className="posted">
                        <span>Posted On:</span>{" "}
                        {element.jobPostedOn.substring(0, 10)}
                      </p>
                      <div className="btn-wrapper">
                        <Link
                          className="btn"
                          to={`/post/application/${element._id}`}
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No jobs found.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;
