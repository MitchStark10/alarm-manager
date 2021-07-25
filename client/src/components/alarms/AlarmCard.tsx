import {AlarmData} from './AlarmTypes';

interface AlarmCardProps {
	data: AlarmData
}

export default function AlarmCard({data}: AlarmCardProps) {
    return (
        <>
            <h3>{data.AlarmText}</h3>
        </>
    );
}
