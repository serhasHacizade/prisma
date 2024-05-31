"use client"

interface Props {
    children: React.ReactNode
}

const GlobalStyleProvider = ({children}: Props) => {
  return (
    <div style={GlobalStyles}>{children}</div>
  )
}

const GlobalStyles = {
  padding: "2.5rem",
  display: "flex",
  gap: "2.5rem",
  height: "100%"

}


export default GlobalStyleProvider