cmake_minimum_required(VERSION 3.28)
project(crow-app VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include(FetchContent)
FetchContent_Declare(Crow
    GIT_REPOSITORY https://github.com/CrowCpp/Crow.git
    GIT_TAG v1.3.2
)
FetchContent_MakeAvailable(Crow)

add_executable(app main.cc)
target_link_libraries(app PRIVATE Crow::Crow)

enable_testing()
find_package(GTest REQUIRED)
add_executable(health_test tests/health_test.cc)
target_link_libraries(health_test PRIVATE Crow::Crow GTest::gtest_main)
gtest_discover_tests(health_test)
