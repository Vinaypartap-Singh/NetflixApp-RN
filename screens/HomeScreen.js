import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import TrendingComp from "../components/TrendingComp";
import Header from "../components/Header";
import MovieRows from "../components/MoviesRows";

export default function HomeScreen() {
  const api = "9f0d60fb73ce2b261485d824070652f5";
  return (
    <ScrollView
      automaticallyAdjustContentInsets={true}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "black", paddingHorizontal: 20 }}
    >
      <Header />
      <TrendingComp />
      <MovieRows />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
