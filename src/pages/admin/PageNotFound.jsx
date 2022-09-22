import { Alert } from "react-bootstrap"

const PageNotFound = () => {
    return <Alert variant="warning" className="text-center">
        <h1 className="text-danger fw-bold">Page Not Found</h1>
        <p className="text-danger">Please Select the menu to visit page</p>
    </Alert>
}

export default PageNotFound