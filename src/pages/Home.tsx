import Navbar from "../components/Navbar"

const Home = () => {
    
return (
    <div className="min-h-screen bg-slate-950 text-white">



        <section className="bg-slate-950">
            <main className="relative flex h-[785px] flex-col items-center justify-between overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(96,165,250,0.58)_0%,_rgba(59,130,246,0.32)_18%,_rgba(29,78,216,0.16)_36%,_rgba(15,23,42,0)_64%),radial-gradient(circle_at_top_left,_rgba(96,165,250,0.2),_transparent_28%),radial-gradient(circle_at_bottom_center,_rgba(37,99,235,0.22),_transparent_34%),linear-gradient(180deg,_#06111f_0%,_#071a33_46%,_#0b2a56_100%)] bg-cover text-sm text-white max-md:px-4 text-center">

                <Navbar/>        

                <div className="relative z-10 flex w-full flex-col items-center justify-center">
                    <h1 className="text-4xl font-semibold tracking-tight text-white md:text-[40px]">
                        To the stars who listen
                    </h1>
                    <p className="mt-6 text-base text-white/85">and the dreams that are answered</p>
                </div>
                <p className="pb-3 text-white/55">Copyright © 2026 Cristian Lopez</p>
            </main>
        </section>

    </div>
)
}

export default Home