import clsx from "clsx";
import {useEffect, useState} from "react";

export default function VersionText({className = ""}: { className?: string }) {
    const [versionName, setVersionName] = useState("loading")
    useEffect(() => {
        fetch("https://api.github.com/repos/Baywork/sprig-game/commits").then(async (res) => {
            const st = await res.text()
            setVersionName(JSON.parse(st)[0]["sha"].toString().replaceAll("\n", "").substring(0, 7))
            console.log(JSON.parse(st)[0])
        })
    }, [])
    return (<p className={clsx("", className)}>
        {versionName}
    </p>)
}