
export default function IconBox({info}) {
  const {icon,title,desc}=info
  return (
    <div className="box w-1/2 md:w-1/4 p-3 ">
    <i className={`${icon} pl-1 text-4xl text-primary-500`}></i>
    <h6 className="text-lg text-center md:text-start font-semibold my-3">{title}</h6>
    <p className="text-gray-600">{desc}</p>
  </div>
  )
}
