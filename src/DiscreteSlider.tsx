import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"
import Slider from "@mui/material/Slider"
import { styled } from "@mui/system"

function createMarks(labels: string[]): any[] {
  return labels.map((label, index) => {
    return { value: index, label }
  })
}

class DiscreteSlider extends StreamlitComponentBase {
  public state = { value: 0 }

  public render = (): ReactNode => {
    const options = this.props.args["options"]

    const width = this.props.width
    const vMargin = 7
    const hMargin = 20
    const StyledSlider = styled(Slider)({
      margin: `${vMargin}px ${hMargin}px`,
      width: width - hMargin * 2,
    })

    return (
      <StyledSlider
        aria-label="Restricted values"
        defaultValue={0}
        min={0}
        max={options.length - 1}
        step={null}
        size="small"
        value={this.state.value}
        valueLabelDisplay="off"
        marks={createMarks(options)}
        onChange={(_, value) => {
          const selectedOption = options[Number(value)]
          this.setState({ value })
          Streamlit.setComponentValue(selectedOption)
        }}
        disabled={this.props.disabled}
      />
    )
  }
}

export default withStreamlitConnection(DiscreteSlider)
