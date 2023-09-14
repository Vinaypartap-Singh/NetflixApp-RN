import { Text, View } from "react-native";
import React from "react";
import moviesURL from "../data/moviesURL";
import MovieRow from "./MovieRow";
const MovieRows = () => {
  const data = moviesURL;
  return (
    <View>
      {data.map((movie, index) => (
        <MovieRow key={index} title={movie.name} url={movie.url} />
      ))}
      <Text>MovieRows</Text>
    </View>
  );
};

export default MovieRows;
