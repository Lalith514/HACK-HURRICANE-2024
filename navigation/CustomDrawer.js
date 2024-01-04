import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    useDrawerProgress
} from "@react-navigation/drawer";
import Animated from "react-native-reanimated";
import { connect } from "react-redux";
import { setSelectedTab } from "../stores/tab/tabActions";

import { MainLayout } from "../screens";
import {
    COLORS,
    FONTS,
    SIZES,
    constants,
    icons,
    dummyData
} from "../constants";

const Drawer = createDrawerNavigator()

const CustomDrawerItem = ({ label, icon, isFocused, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: 40,
                marginBottom: SIZES.base,
                alignItems: 'center',
                paddingLeft: SIZES.radius,
                borderRadius: SIZES.base,
                backgroundColor: isFocused ? COLORS.transparentBlack1 : null
            }}
            onPress={onPress}
        >
            <Image
                source={icon}
                style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.white
                }}
            />

            <Text
                style={{
                    marginLeft: 15,
                    color: COLORS.white,
                    ...FONTS.h3
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}

const CustomDrawerContent = ({ navigation, selectedTab, setSelectedTab }) => {
    return (
        <DrawerContentScrollView
            scrollEnabled={false}
            contentContainerStyle={{
                flex: 1,
                backgroundColor: COLORS.primary
            }}
        >
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: SIZES.radius
                }}
            >
                {/* Close */}
                <View
                    style={{
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                    }}
                >
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => navigation.closeDrawer()}
                    >
                        <Image
                            source={icons.cross}
                            style={{
                                height: 35,
                                width: 35,
                                tintColor: COLORS.white
                            }}
                        />
                    </TouchableOpacity>
                </View>

                {/* Profile */}
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        navigation.closeDrawer()
                        navigation.navigate("MyAccount")
                    }}
                >
                    <Image
                        source={dummyData.myProfile?.profile_image}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: SIZES.radius
                        }}
                    />

                    <View
                        style={{
                            marginLeft: SIZES.radius
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{dummyData.myProfile?.name}</Text>
                        <Text style={{ color: COLORS.white, ...FONTS.body4 }}>View your profile</Text>
                    </View>
                </TouchableOpacity>

                {/* Drawer Items */}
                <View
                    style={{
                        flex: 1,
                        marginTop: SIZES.height > 800 ? SIZES.padding : SIZES.radius
                    }}
                >
                    <CustomDrawerItem
                        label={constants.screens.home}
                        icon={icons.home}
                        isFocused={selectedTab == constants.screens.home}
                        onPress={() => {
                            setSelectedTab(constants.screens.home)
                            navigation.navigate("MainLayout")
                        }}
                    />

                    <CustomDrawerItem
                        label={constants.screens.my_wallet}
                        icon={icons.wallet}
                    />

                    <CustomDrawerItem
                        label={constants.screens.notification}
                        icon={icons.notification}
                        isFocused={selectedTab == constants.screens.notification}
                        onPress={() => {
                            setSelectedTab(constants.screens.notification)
                            navigation.navigate("MainLayout")
                        }}
                    />

                    <CustomDrawerItem
                        label={constants.screens.favourite}
                        icon={icons.favourite}
                        isFocused={selectedTab == constants.screens.favourite}
                        onPress={() => {
                            setSelectedTab(constants.screens.favourite)
                            navigation.navigate("MainLayout")
                        }}
                    />

                    {/* Line Divider */}
                    <View
                        style={{
                            height: 2,
                            marginVertical: SIZES.height > 800 ? SIZES.radius : SIZES.base,
                            marginLeft: SIZES.radius,
                            backgroundColor: COLORS.lightGray1
                        }}
                    />

                    <CustomDrawerItem
                        label="Track Your Order"
                        icon={icons.location}
                        onPress={() => {
                            navigation.closeDrawer()
                            navigation.navigate("Map")
                        }}
                    />

                    <CustomDrawerItem
                        label="My Orders"
                        icon={icons.location}
                        onPress={() => {
                            navigation.closeDrawer()
                            navigation.navigate("Order")
                        }}
                    />

                    <CustomDrawerItem
                        label="Coupons"
                        icon={icons.coupon}
                        onPress={() => {
                            navigation.closeDrawer()
                            navigation.navigate("Coupon")
                        }}
                    />

                    <CustomDrawerItem
                        label="Settings"
                        icon={icons.setting}
                        onPress={() => {
                            navigation.closeDrawer()
                            navigation.navigate("Settings")
                        }}
                    />

                    <CustomDrawerItem
                        label="Invite a Friend"
                        icon={icons.profile}
                    />

                    <CustomDrawerItem
                        label="Help Center"
                        icon={icons.help}
                    />
                </View>

                <View
                    style={{
                        marginBottom: SIZES.height > 800 ? SIZES.padding : 0
                    }}
                >
                    <CustomDrawerItem
                        label="Logout"
                        icon={icons.logout}
                    />
                </View>
            </View>
        </DrawerContentScrollView>
    )
}

const CustomDrawer = ({ selectedTab, setSelectedTab }) => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.primary
            }}
        >
            <Drawer.Navigator
                useLegacyImplementation
                drawerType="slide"
                overlayColor="transparent"
                screenOptions={{
                    headerShown: false,
                    overlayColor: "transparent",
                    drawerStyle: {
                        width: '60%',
                    }
                }}
                initialRouteName="MainLayout"
                drawerContent={props => {
                    return (
                        <CustomDrawerContent
                            navigation={props.navigation}
                            selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                        />
                    )
                }}
            >
                <Drawer.Screen name="MainLayout">
                    {props => <MainLayout {...props} />}
                </Drawer.Screen>
            </Drawer.Navigator>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        selectedTab: state.tabReducer.selectedTab
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedTab: (selectedTab) => { return dispatch(setSelectedTab(selectedTab)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer)