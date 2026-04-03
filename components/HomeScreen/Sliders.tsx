import { axiosClient } from "@/app/services/GlobalApi";
import React, { useEffect } from "react";
import { Dimensions, FlatList, Image, View } from "react-native";

type SliderType = {
  name: string;
  image: { url: string };
};

export default function Sliders() {
  const [sliders, setSliders] = React.useState<SliderType[]>([]);

  useEffect(() => {
    GetSliders();
  }, []);

  const GetSliders = async () => {
    const result = await axiosClient.get("/sliders?populate=*");
    console.log(JSON.stringify(result.data));
    setSliders(result?.data?.data);
  };
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <FlatList
        data={sliders}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Image
              source={{ uri: item?.image?.url }}
              style={{
                width: Dimensions.get("screen").width * 0.9,
                height: 200,
                borderRadius: 20,
                marginRight: 15,
              }}
            />
          </View>
        )}
      />
    </View>
  );
}
