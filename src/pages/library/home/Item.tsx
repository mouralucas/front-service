import {ReactElement} from "react";
import {Item} from "../../../interfaces/Library.tsx";
import NoCover from '../../../assets/core/images/no-cover.png'

interface ItemProps {
    item?: Item;
}

const App = (props: ItemProps): ReactElement => {
    return (
        <div className='container'>
            <div className="row">
                <div className="col-3">
                    <div className="cover-image-container">
                        <img
                            src={NoCover}
                            alt="Book Cover"
                            className="book-cover"
                        />
                    </div>
                </div>
                <div className="col-9">
                    <div className="row">
                        <label htmlFor="">Descrição</label>
                        {props.item?.summary}
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Título</label>
                            <p className='h2'>
                                {props.item?.title ?? 'Lucas'}
                            </p>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Subtítulo</label>
                            <p className="h2">
                                {props.item?.subtitle ?? 'Moura'}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Autor</label>
                            {props.item?.mainAuthorName}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-4">
                    <label htmlFor="">ISBN</label>
                    {props.item?.isbn ?? '123456'}
                </div>
            </div>
        </div>
    )
}

export default App;