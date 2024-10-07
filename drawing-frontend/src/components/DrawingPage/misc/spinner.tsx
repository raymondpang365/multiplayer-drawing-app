import loaderSt from "@components/reusable/loader/spinnerv1.module.scss";

export default function Spinner({ loaderCls =loaderSt.loader,
  circularCls=loaderSt.circular, trail = false,
  pathCls=loaderSt.path, path2Cls=loaderSt.path2
                }){
    return <div
        className={loaderCls}>
        <svg className={circularCls} viewBox="25 25 50 50">
            { trail ?
                <circle className={path2Cls} cx="50" cy="50" r="20" fill="none"
                        strokeMiterlimit="10"/> : null }
            <circle className={pathCls} cx="50" cy="50" r="20" fill="none"
                    strokeMiterlimit="10"/>
        </svg>
    </div>
}
