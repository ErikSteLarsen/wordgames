import { LetterState } from "./types";


interface Props {
    letter: string;
    state: LetterState;

}


const VisualLetter: React.FC<Props> = ({ letter, state }) => {


    return (
        <div></div>
    )
}


export default VisualLetter;