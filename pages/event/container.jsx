export const Container = ({children}) =>{
    return (
        <div className="container p-4 d-flex justify-content-between">
            <div className="col-md4 offset-md-4 ">
                {children}
            </div>
        </div>
    )
}