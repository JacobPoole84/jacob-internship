import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
      )
      .then((response) => {
        setAuthorData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching author data:", error);
        setLoading(false);
      });
  }, [authorId]);

  useEffect(() => {
    if (authorData) {
      setFollowers(authorData.followers ?? 0);
    }
  }, [authorData]);

  const handleFollow = () => {
    if (isFollowing) {
      setFollowers((prev) => prev - 1);
      setIsFollowing(false);
    } else {
      setFollowers((prev) => prev + 1);
      setIsFollowing(true);
    }
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        {loading ? (
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton circle={true} width="150px" height="150px" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton width="200px" height="30px" />
                            <span className="profile_username">
                              <Skeleton width="100px" height="30px" />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width="200px" height="30px" />
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              <Skeleton width="80px" height="30px" />
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div>
                          <Skeleton width="100px" height="30px" />
                        </div>
                        <div>
                          <Skeleton width="100px" height="30px" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="row">
                    {Array.from({ length: 8 }, (_, index) => ({ id: index })).map((_, index) => (
                      <div
                        className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                        key={index}
                      >
                        <div className="nft__item">
                          <div className="author_list_pp">
                            <Skeleton circle={true} width="50px" height="50px" />
                          </div>
                           <div className="nft__item_wrap">
                             <div className="nft__item_extra">
                               <div className="nft__item_buttons">
                                 <button>
                                   <Skeleton width="80px" height="30px" />
                                 </button>
                                 <div className="nft__item_share">
                                   <h4>
                                     <Skeleton width="50px" height="20px" />
                                   </h4>
                                 </div>
                               </div>
                             </div>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorData?.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorData?.authorName}
                            <span className="profile_username">
                              @{authorData?.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {authorData?.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {followers} followers
                        </div>
                        <button className="btn-main" onClick={handleFollow}>
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems authorData={authorData} loading={loading} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Author;
