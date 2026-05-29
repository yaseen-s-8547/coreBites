export default function Paywall() {
    return (
        <>

            <div className="w-full flex justify-center  px-12 sm:px-5   min-h-screen bg-[radial-gradient(circle_at_7%_30%,rgba(255,255,255,0.25),transparent_40%),radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.15),transparent_35%),linear-gradient(to_right,#000000,#000000)]">
                <div className="w-full  flex flex-col gap-5 max-w-3xl mt-27 min-h-96  max-h-305.5 sm:max-h-102.5 bg-white rounded-xl shadow "  >
                    <div className=" mt-3 ps-3 border-b-2  border-black line-clamp-1 text-2xl font-bolder">
                        <h1>Title: Lorem ipsum dolor sit amet jfrifjirjfrfurf eijfiejfief diejdiejdi eieneife</h1>
                    </div>
                    <div className="ps-5 pe-5 pt-3">
                        <p className="font-bold text-md"><span className="text-xl font-bold">Synopsis:</span> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium iure nobis quam? Ut quasi veritatis sed accusamus eos fugit esse nulla amet eum. Officia quos cumque molestias consectetur, consequatur asperiores.</p>

                    </div>

                    <div className="ps-5 pe-5 pt-3">
                        <p className="font-bold text-md"><span className="text-xl font-bold">Tag line: </span>learn how react works and how it influence user experience</p>
                    </div>
                    <div className="ps-5 pe-5 pt-3">
                        <p className="font-bold text-md"><span className="text-xl font-bold">what you will learn :: </span>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sed ducimus modi doloribus, deserunt corporis dolorum rem excepturi tenetur harum mollitia iste odit ut dolor quae praesentium quos quia aliquid!</p>

                    </div>
                    <button className="bg-green-700 hover:bg-red-700 text-white hover:text-white rounded-t-none w-full max-w-3xl rounded-xl shadow p-5  ">BUY NOW</button>

                </div>

            </div>
        </>
    )
}