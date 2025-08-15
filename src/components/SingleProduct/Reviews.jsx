"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import {
  getProductReviews,
  addProductReview,
  editReview,
  deleteReview,
} from "@/features/reviewSlice";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import QuickLogin from "../Login/QuickLogin";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { GrFormNextLink } from "react-icons/gr";
import { MdModeEdit } from "react-icons/md";
import { DialogTrigger } from "@radix-ui/react-dialog";

const Reviews = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { reviews, productDetail, page, limit, sort, myreview } = useSelector(
    (state) => state.review
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [quickLoginOpen, setQuickLoginOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editName, setEditName] = useState("");
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(0);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(getProductReviews({ productId, page, limit, sort }));
  }, [dispatch, productId, page, limit, sort]);

  const handleStarClick = (value) => {
    if (!user) {
      setQuickLoginOpen(true);
      return;
    }
    setRating(value);
    setDialogOpen(true);
  };

  const handleAddReview = async () => {
    if (!comment.trim()) return;
    setLoading(true);
    await dispatch(
      addProductReview({ productId, title, name, comment, rating })
    );
    setLoading(false);
    setDialogOpen(false);
    setTitle("");
    setName("");
    setComment("");
    setRating(0);
  };

  // Open edit dialog and prefill fields
  const handleEditClick = () => {
    if (!myreview) return;
    setEditTitle(myreview.title || "");
    setEditName(myreview.name || "");
    setEditComment(myreview.comment || "");
    setEditRating(myreview.rating || 0);
    setEditDialogOpen(true);
  };

  // Update review handler
  const handleUpdateReview = async () => {
    if (!editComment.trim()) return;
    setEditLoading(true);
    await dispatch(
      editReview({
        productId,
        reviewId: myreview._id,
        title: editTitle,
        name: editName,
        comment: editComment,
        rating: editRating,
      })
    );
    setEditLoading(false);
    setEditDialogOpen(false);
  };

  // Delete review handler
  const handleDeleteReview = async () => {
    setEditLoading(true);
    await dispatch(
      deleteReview({
        productId,
        reviewId: myreview._id,
      })
    );
    setDeleteDialogOpen(false);
    setEditLoading(false);
    setEditDialogOpen(false);
  };

  const totalRatings = productDetail?.totalRatings || 0;
  const starCounts = productDetail?.starCounts || {};
  const averageRating = productDetail?.averageRating || 0;
  // Calculate recommendCount as number of ratings >= 3
  const recommendCount =
    (starCounts[3] || 0) + (starCounts[4] || 0) + (starCounts[5] || 0);

  return (
    <div className=" md:py-6 w-full">
      <div className="flex md:flex-row flex-col min-w-full justify-between gap-10 md:gap-40">
        {/* Left: Rating Snapshot */}

        <div className="text-start md:hidden">
          <h3 className="font-semibold  mb-1 font-helvetica tracking-wide">
            Overall Rating:
          </h3>
          <div className="flex gap-4 items-center">
            <p className="text-5xl font-bold leading-tight tracking-wider font-helvetica">
              {averageRating.toFixed(1)}
            </p>
            <div>
              <div className="flex justify-center gap-0.5 mb-2">
                {/* Render stars based on averageRating */}
                {(() => {
                  const stars = [];
                  const fullStars = Math.floor(averageRating);
                  const hasHalf =
                    averageRating - fullStars >= 0.25 &&
                    averageRating - fullStars < 0.75;
                  const totalStars = hasHalf ? fullStars + 1 : fullStars;
                  for (let i = 0; i < 5; i++) {
                    if (i < fullStars) {
                      stars.push(<FaStar key={i} className="text-black" />);
                    } else if (i === fullStars && hasHalf) {
                      stars.push(
                        <FaRegStarHalfStroke key={i} className="text-black" />
                      );
                    } else {
                      stars.push(<FaRegStar key={i} className="text-black" />);
                    }
                  }
                  return stars;
                })()}
              </div>
              <p className="text-xs text-gray-600 font-helvetica">
                {totalRatings} Reviews
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1 font-helvetica">
            {recommendCount} out of {totalRatings} (
            {totalRatings > 0
              ? Math.round((recommendCount / totalRatings) * 100)
              : 0}
            %) reviewers recommend this product
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-1 font-helvetica md:min-w-[400px]">
            Rating Snapshot
          </h3>
          <p className="text-sm text-gray-700 mb-3 font-helvetica">
            Select a row below to filter reviews.
          </p>
          {Object.keys(starCounts)
            .sort((a, b) => b - a)
            .map((star) => {
              const count = starCounts[star] || 0;
              const percentage =
                totalRatings > 0 ? (count / totalRatings) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2 mb-1">
                  <span className="text-sm w-12 font-helvetica">
                    {star} stars
                  </span>
                  <div className="flex-1 bg-gray-200 h-[14px] overflow-hidden">
                    <div
                      className="bg-black h-[14px]"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs w-10 text-right font-helvetica">
                    {count}
                  </span>
                </div>
              );
            })}
        </div>

        {/* Center: Overall Rating */}
        <div className="text-start hidden md:block">
          <h3 className="font-semibold  mb-1 font-helvetica tracking-wide">
            Overall Rating:
          </h3>
          <div className="flex gap-4 items-center">
            <p className="text-5xl font-bold leading-tight tracking-wider font-helvetica">
              {averageRating.toFixed(1)}
            </p>
            <div>
              <div className="flex justify-center gap-0.5 mb-2">
                {/* Render stars based on averageRating */}
                {(() => {
                  const stars = [];
                  const fullStars = Math.floor(averageRating);
                  const hasHalf =
                    averageRating - fullStars >= 0.25 &&
                    averageRating - fullStars < 0.75;
                  const totalStars = hasHalf ? fullStars + 1 : fullStars;
                  for (let i = 0; i < 5; i++) {
                    if (i < fullStars) {
                      stars.push(<FaStar key={i} className="text-black" />);
                    } else if (i === fullStars && hasHalf) {
                      stars.push(
                        <FaRegStarHalfStroke key={i} className="text-black" />
                      );
                    } else {
                      stars.push(<FaRegStar key={i} className="text-black" />);
                    }
                  }
                  return stars;
                })()}
              </div>
              <p className="text-xs text-gray-600 font-helvetica">
                {totalRatings} Reviews
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1 font-helvetica">
            {recommendCount} out of {totalRatings} (
            {totalRatings > 0
              ? Math.round((recommendCount / totalRatings) * 100)
              : 0}
            %) reviewers recommend this product
          </p>
        </div>

        {/* Right: Review this Product or Show My Review */}
        <div className="text-start">
          {myreview ? (
            // Show user's review if present
            <div className="">
              <h3 className="font-semibold mb-2 font-helvetica">Your Review</h3>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-1 ">
                  {Array.from({ length: 5 }, (_, i) =>
                    i < myreview.rating ? (
                      <FaStar key={i} className="text-black" />
                    ) : (
                      <FaRegStar key={i} className="text-black" />
                    )
                  )}
                </div>
                <div
                  className=" bg-black w-8 h-6 flex justify-center items-center cursor-pointer"
                  onClick={handleEditClick}
                >
                  <MdModeEdit className="text-white" />
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-black font-helvetica mb-4">
                <span className=" font-helvetica">{myreview.name}</span>
                <span className="font-helvetica">
                  {myreview.createdAt
                    ? new Date(myreview.createdAt).toLocaleDateString()
                    : ""}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold font-helvetica ">
                  {myreview.title || "Your Review"}
                </span>
                {myreview.certifiedBuyer && (
                  <span className="ml-2 py-0.5 text-xs text-[#056491] rounded font-helvetica">
                    Certified Buyer
                  </span>
                )}
              </div>

              <p className="font-helvetica text-[14px] mb-1">
                {myreview.comment}
              </p>
            </div>
          ) : (
            // Show review form if user hasn't reviewed
            <>
              <h3 className="font-semibold mb-2 font-helvetica">
                Review this Product
              </h3>
              <div className="flex justify-start gap-2 mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleStarClick(i + 1)}
                    className="w-10 h-10 border border-gray-400 flex items-center justify-center"
                  >
                    {i < rating ? (
                      <FaStar className="text-black" />
                    ) : (
                      <FaRegStar className="text-black" />
                    )}
                  </motion.button>
                ))}
              </div>
              <p className=" text-gray-500 text-sm font-helvetica md:w-56">
                {user
                  ? `Hey ${user.name}, leave a review!`
                  : "Adding a review will require a valid email for verification"}
              </p>
            </>
          )}
        </div>
      </div>

      {reviews && reviews.length > 0 && (
        <div className="mt-5 border-t pt-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold font-helvetica text-lg">
                What others are saying
              </h3>
              <div className="text-xs text-gray-500 font-helvetica mt-2">
                Showing {reviews.length} of {productDetail?.totalRatings || 0}{" "}
                reviews
              </div>
            </div>
            <Link
              href={`/reviews/${productId}`}
              className="text-[#056491] text-sm flex items-center  hover:underline font-helvetica"
            >
              See all reviews <GrFormNextLink className="inline-block ml-1" />
            </Link>
          </div>
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={24}
            freeMode={true}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 3 },
            }}
            className="review-swiper"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="border min-h-[250px] p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: 5 }, (_, i) =>
                        i < review.rating ? (
                          <FaStar key={i} className="text-black" />
                        ) : (
                          <FaRegStar key={i} className="text-black" />
                        )
                      )}
                    </div>
                    <div className="flex justify-between items-center text-xs text-black font-helvetica mb-4">
                      <span className="font-helvetica">
                        {review.name}{" "}
                        {review.certifiedBuyer && (
                          <span className="ml-1 text-xs text-[#056491] rounded font-helvetica">
                            Certified Buyer
                          </span>
                        )}
                      </span>
                      <span className="font-helvetica">
                        {review.createdAt
                          ? formatDistanceToNow(new Date(review.createdAt), {
                              addSuffix: true,
                            })
                          : ""}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold font-helvetica ">
                        {review.title || "Review"}
                      </span>
                    </div>
                    <p className="font-helvetica text-[14px] mb-1">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Dialog for Adding Review */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className=" p-6 bg-white rounded-xl shadow-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">
              <h1 className="font-helvetica capitalize">Add Review</h1>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="block mb-2 font-helvetica">Title</Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                className="border-0 font-helvetica text-sm"
                placeholder="Enter the title (optional) "
              />
            </div>
            <div>
              <Label className="block mb-2 font-helvetica">Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                className="border-0 font-helvetica text-sm"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <Label className="font-semibold block mb-2 font-helvetica">
                Comment
              </Label>
              <Textarea
                value={comment}
                onChange={(e) => {
                  if (e.target.value.length <= 500) setComment(e.target.value);
                }}
                maxLength={500}
                placeholder="Review comment (max 500 characters)"
                className="min-h-40 font-helvetica text-sm "
              />
              <p className="text-muted-foreground text-xs text-end mt-1">
                {comment.length}/500
              </p>
            </div>
            <div>
              <Label className="font-semibold block mb-2 font-helvetica">
                Rating
              </Label>
              <div className="flex gap-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    className="w-8 h-8 border border-gray-400 flex items-center justify-center"
                    onClick={() => setRating(i + 1)}
                  >
                    {i < rating ? (
                      <FaStar className="text-black" />
                    ) : (
                      <FaRegStar className="text-black" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                className="bg-black text-white hover:bg-gray-800"
                onClick={handleAddReview}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Review"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog for Editing Review */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="p-6 bg-white rounded-xl shadow-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">
              <h1 className="font-helvetica capitalize">Edit Review</h1>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="block mb-2 font-helvetica">Title</Label>
              <Input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                maxLength={100}
                className="border-0 font-helvetica text-sm"
                placeholder="Enter the title (optional) "
              />
            </div>
            <div>
              <Label className="block mb-2 font-helvetica">Name</Label>
              <Input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                maxLength={100}
                className="border-0 font-helvetica text-sm"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <Label className="font-semibold block mb-2 font-helvetica">
                Comment
              </Label>
              <Textarea
                value={editComment}
                onChange={(e) => {
                  if (e.target.value.length <= 500)
                    setEditComment(e.target.value);
                }}
                maxLength={500}
                placeholder="Review comment (max 500 characters)"
                className="min-h-40 font-helvetica text-sm "
              />
              <p className="text-muted-foreground text-xs text-end mt-1">
                {editComment.length}/500
              </p>
            </div>
            <div>
              <Label className="font-semibold block mb-2 font-helvetica">
                Rating
              </Label>
              <div className="flex gap-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    className="w-8 h-8 border border-gray-400 flex items-center justify-center"
                    onClick={() => setEditRating(i + 1)}
                  >
                    {i < editRating ? (
                      <FaStar className="text-black" />
                    ) : (
                      <FaRegStar className="text-black" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <Dialog>
                <DialogTrigger
                  asChild
                  open={deleteDialogOpen}
                  onOpenChange={setDeleteDialogOpen}
                >
                  <Button variant="destructive">Delete</Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      <h3 className="font-helvetica capitalize">
                        Delete Review
                      </h3>
                    </DialogTitle>
                  </DialogHeader>
                  <p className="text-sm font-helvetica text-gray-600 mb-4">
                    Are you sure you want to delete this review? This action
                    cannot be undone.
                  </p>
                  <DialogFooter>
                    <Button variant="destructive" onClick={handleDeleteReview}>
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                className="bg-black text-white hover:bg-gray-800"
                onClick={handleUpdateReview}
                disabled={editLoading}
              >
                {editLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <QuickLogin open={quickLoginOpen} setOpen={setQuickLoginOpen} />
    </div>
  );
};

export default Reviews;
