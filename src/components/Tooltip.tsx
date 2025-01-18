export default function TooltipTemplate(info: any) {
    return (
        <div className="state-tooltip">
            <div className="capital">
                <span className="caption">Capital</span>: Text 1
            </div>
            <div className="population">
                <span className="caption">Population</span>: 10 people
            </div>
            <div>
                <span className="caption">Area</span>: <span className="area-km">{info.data}</span> km<sup>2</sup> (<span className="area-mi">15</span> mi<sup>2</sup>)
            </div>
        </div>
    );
}