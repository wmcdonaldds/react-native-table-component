import { Feather } from "@expo/vector-icons";
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { sum } from '../utils';
import { Cell } from './cell';

export class Row extends Component {
  static propTypes = {
    style: PropTypes.object,
    textStyle: PropTypes.object
  };

  render() {
    const { data, style, widthArr, height, flexArr, textStyle, cellTextStyle, ...props } = this.props;
    let width = widthArr ? sum(widthArr) : 0;

    return data ? (
      <View style={[height && { height }, width && { width }, styles.row, style]}>
        {data.map((item, i) => {
          const flex = flexArr && flexArr[i];
          const wth = widthArr && widthArr[i];
          return (
            <Cell
              key={i}
              data={item}
              width={wth}
              height={height}
              flex={flex}
              textStyle={{ ...(cellTextStyle && cellTextStyle(item)), ...textStyle }}
              {...props}
            />
          );
        })}
      </View>
    ) : null;
  }
}

export class Rows extends Component {
  static propTypes = {
    style: PropTypes.object,
    textStyle: PropTypes.object
  };

  render() {
    const {
      data,
      style,
      widthArr,
      heightArr,
      flexArr,
      textStyle,
      belowText,
      belowTextStyle,
      rowStyles,
      childAbove,
      ...props
    } = this.props;
    const flex = flexArr ? sum(flexArr) : 0;
    const width = widthArr ? sum(widthArr) : 0;

    return data ? (
      <View style={[flex && { flex }, width && { width }]}>
        {data.map((item, i) => {
          const height = heightArr && heightArr[i];
          return (
            <View key={i} style={rowStyles?.[i]}>
              {childAbove?.[i]}
              <Row
                data={item}
                widthArr={widthArr}
                height={height}
                flexArr={flexArr}
                style={style}
                textStyle={textStyle}
                {...props}
              />
              {belowText?.[i] && <Text style={belowTextStyle}> <Feather name="corner-down-right" />{belowText?.[i].map((x, i) => <Fragment key={i}><Text>{x}</Text> {''}</Fragment>)}</Text>}
            </View>
          );
        })}
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    overflow: 'hidden'
  }
});
