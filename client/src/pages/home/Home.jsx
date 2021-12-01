import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMovies } from '../../redux/movieRedux/apiCalls';
import './home.scss';
import ImgSlider from '../../components/bannerSlide/BannerSlide';
import ListMovie from '../../components/listMovie/ListMovie';

export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        getMovies(dispatch);
    }, [dispatch]);
    return (
        <div>
            <ImgSlider />
            <div className="container">
                <h2 style={{ marginBottom: '10px' }}> Responsive </h2>
                <ListMovie />
            </div>
        </div>
    );
}

// export default function Home() {
//     const [file, setFile] = useState(null);
//     const open = async () => {
//         try {
//             const result = await fetch('http://localhost:3000/videos/test.mp4');
//             const blob = await result.blob();
//             setFile(URL.createObjectURL(blob));
//         } catch (err) {}
//     };
//     useEffect(() => {
//         open();
//     }, []);
//     return (
//         <div className="home">
//             <Player
//                 playsInline
//                 poster="https://img1.kakaocdn.net/thumb/R1280x0/?fname=https://img.phimchill.tv/images/info/bright-as-the-moon.jpg"
//                 src={file}
//             />
//             {/* <input id="contained-button-file" type="file" onChange={(e) => setFile(e.target.files[0])} /> */}
//             <button>Click</button>
//         </div>
//     );
// }
