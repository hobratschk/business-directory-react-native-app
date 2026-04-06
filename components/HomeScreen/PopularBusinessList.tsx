import Colors from "@/app/services/Colors";
import { axiosClient } from "@/app/services/GlobalApi";
import { CategoryType } from "@/components/HomeScreen/Category";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export type BusinessType = {
  name: string;
  address: string;
  premium: boolean;
  description: string;
  category: CategoryType;
  images: ImagesType[];
  id: number;
};

type ImagesType = {
  url: string;
};

export default function PopularBusinessList() {
  const [businessList, setBusinessList] = React.useState<BusinessType[]>([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    GetPopularBuinessList();
  }, []);

  const GetPopularBuinessList = async () => {
    setLoading(true);
    try {
      const result = await axiosClient.get(
        "/business-lists?filters[premium][$eq]=true&populate=*",
      );
      // Log the raw response for debugging the shape

      const raw = result?.data?.data ?? [];

      const normalized = raw.map((entry: any) => {
        // Handle Strapi-style { id, attributes } wrapper
        const item = entry?.attributes
          ? { ...entry.attributes, id: entry.id }
          : entry;

        // Normalize images to a simple array of URLs
        let images: string[] = [];
        if (item?.images?.data && Array.isArray(item.images.data)) {
          images = item.images.data
            .map((img: any) => img?.attributes?.url ?? null)
            .filter(Boolean);
        } else if (Array.isArray(item?.images)) {
          images = item.images
            .map((img: any) => img?.url ?? img?.attributes?.url)
            .filter(Boolean);
        }

        return { ...item, images };
      });

      setBusinessList(normalized);
    } catch (err) {
      console.warn("Error fetching popular businesses", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <Text style={{ fontSize: 25, fontFamily: "appFontBold" }}>
          PopularBusinessList
        </Text>
        <Text style={{ fontFamily: "appFont", color: Colors.PRIMARY }}>
          View All
        </Text>
      </View>
      {loading && <ActivityIndicator size="large" color={Colors.PRIMARY} />}
      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const imageUrl = item?.images?.[0] ?? null;

          return (
            <View
              key={item?.id ?? index}
              style={{
                width: 230,
                marginRight: 10,
                backgroundColor: Colors.WHITE,
                borderRadius: 15,
              }}
            >
              {imageUrl ? (
                <>
                  <Image
                    source={{ uri: imageUrl }}
                    style={{
                      width: "100%",
                      height: 120,
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                    }}
                  />
                  <View style={{ padding: 7 }}>
                    <Text style={{ fontFamily: "appFontBold", fontSize: 17 }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        marginTop: 2,
                        color: Colors.GRAY,
                        fontFamily: "appFont",
                      }}
                    >
                      {item.address}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 5,
                        gap: 4,
                      }}
                    >
                      <Image
                        source={require("./../../assets/images/star.png")}
                        style={{ width: 20, height: 20 }}
                      />
                      <Text>4.3/5</Text>
                    </View>
                  </View>
                </>
              ) : (
                <View
                  style={{
                    width: "100%",
                    height: 80,
                    backgroundColor: "#eee",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ fontFamily: "appFont", color: Colors.PRIMARY }}
                  >
                    No image
                  </Text>
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}
