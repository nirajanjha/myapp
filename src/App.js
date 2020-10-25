import { useEffect, useState } from "react";
import "./App.css";
import data from "./data/colleges.json";

function App() {
	const collegeData = data.colleges.slice(0, 10);
	const [isFetching, setIsFetching] = useState(false);
	const [num, setNum] = useState(20);
	const [college, setCollege] = useState(collegeData);

	function isScrolling() {
		if (
			window.innerHeight + document.documentElement.scrollTop !==
			document.documentElement.offsetHeight
		) {
			return;
		} else {
			setIsFetching(true);
		}
	}
	useEffect(() => {
		window.addEventListener("scroll", isScrolling);
		return () => window.removeEventListener("scroll", isScrolling);
	}, []);

	useEffect(() => {
		if (isFetching) {
			setCollege(data.colleges.slice(0, num));
			setNum(num + 10);
			setIsFetching(false);
		}
	}, [isFetching]);
	return (
		<div className="layout">
			<h1 className="heading">Colleges in North India</h1>
			<div className="wrapper">
				{college.map((data) => {
					return (
						<div className="college-section">
							<div className="img-wrapper">
								<div
									className="img"
									// style={{ backgroundImage: `url(${collegeData.image})` }}
								>
									<div className="img-status">
										<p>PROMOTED</p>
									</div>
									<div className="score">
										<p>
											<span className="mark">3.9</span>/5
										</p>
										<p>{data.rating_remarks}</p>
									</div>
									<div className="img-tag-left">
										{data.tags.map((data) => {
											return <p className="img-tag-left-left">{data}</p>;
										})}
									</div>
									<div className="img-tag-right">
										<p>{data.ranking}</p>
									</div>
								</div>
							</div>
							<div className="college-description">
								<div className="college-description-left">
									<div style={{ display: "flex" }}>
										<h1 className="college-name">{data.college_name}</h1>
										<div>
											<span className="fa fa-star checked"></span>
											<span className="fa fa-star checked"></span>
											<span className="fa fa-star checked"></span>
											<span className="fa fa-star"></span>
											<span className="fa fa-star"></span>
										</div>
									</div>
									<div className="college-address">
										{data.nearest_place.map((data, index) => {
											if (index == 0) {
												return <p key={index}>{data}</p>;
											} else {
												return (
													<p style={{ color: "#adadad" }} key={index}>
														{" "}
														| {data}{" "}
													</p>
												);
											}
										})}
									</div>

									<p className="college-direction">
										<span style={{ color: "#37b396", fontWeight: "bold" }}>
											93% Match :
										</span>
										<span style={{ color: "#444444", fontWeight: "bold" }}>
											{" "}
											2.5kms
										</span>{" "}
										from GTB Nagar,
										<span style={{ color: "#444444", fontWeight: "bold" }}>
											{" "}
											7 Kms
										</span>{" "}
										from Rajiv Chowk
									</p>
								</div>
								<div className="college-description-right">
									<div className="marked-price">
										<p className="price">₹{data.original_fees}</p>
										<div className="price-status">
											<p>20</p>
										</div>
									</div>

									<p className="discounted-price">₹ {data.discounted_fees}</p>
									<p className="time-duration">Per Semester (3months)</p>
								</div>
							</div>
							<div className="price-detail">
								<div className="price-detail-left">
									<p>
										<span style={{ fontWeight: "400" }}>Flat</span> Rs
										<span style={{ color: "#4bb89e" }}>2,000</span> off + upto
										Rs
										<span style={{ color: "#4bb89e" }}>500</span> wallet! to
										avail...<span style={{ color: "#1999d2" }}> LOGIN</span>{" "}
									</p>
								</div>
								<div className="price-detail-right">
									<p>Free Cancellation</p>
									<p className="dot"> &#x2022;</p>
									<p>Free Wi-Fi</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
