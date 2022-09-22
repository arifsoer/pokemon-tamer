const DynamicComponent = ({children, component}) => {
  if (!component) {
    return <h2>Please specify the component name</h2>
  }

  const SelectedComponent = component

  return <SelectedComponent>
    {children}
  </SelectedComponent>
}

export default DynamicComponent