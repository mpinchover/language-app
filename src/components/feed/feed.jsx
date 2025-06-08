import { Box, Stack, Spinner, Divider } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import FeedPost from "./feed-post"; // Import the Post component
import CreatePostButton from "./create-post-button"; // Import the CreatePostButton component

const initialData = [
  {
    author: "Space Girl",
    avatarPicture:
      "https://img.stablecog.com/insecure/1920w/aHR0cHM6Ly9iLnN0YWJsZWNvZy5jb20vODJhNGE2NTctMDQ0OC00YzMxLTg3MmQtMmMwZjNjM2MzODI0LmpwZWc.webp",
    postTitle: "Landing on the Moon Isn’t Easy",
    articleSrc:
      "https://apnews.com/article/japan-moon-landing-resilience-be77f0a34032ce5a4fc524fe96888bfa",
    imgSrc:
      "https://ucf83e2bfbe87ceca50a8ff83d72.previews.dropboxusercontent.com/p/thumb/ACqkd7DfoJ8VIJnvOOqN1F2Nh3hPjY68w945UiDM4q3hY95kMvRfM4Ue11D65h_z6lP7PQApWw-NTqezGmGlAV2ABIcTTwBHqppbONhJrpmeAy03aWmBCdXJajARQYJnVNcqueEJkpDJas0IziYsCQkMcIDxo6jBKaGZJOf51kPcaCIuRn2qQG3DR54AR03CyN9zRnS0XwMh-ac9lz15q6T5mDjZ8LiXXyji6KjWQNeZFoTggKC9u6eyrCotuQO1lWesCfPIRRiyq3QpRUNLU_IbWDhe0ARXkHCzCRJ5nIVZk0KF8aL3QWCEcNLs2sVHF4Eqd0NV717qHwSZEx6yD8-HfQg-SPuT2BVorUPt0rsWbyRConWskRtV6bs-nCWAJF6jfkNncH9Tt1o97DEEzDXg/p.png?is_prewarmed=true",
    description:
      "Japan’s private company ispace tried to land its Resilience spacecraft on the moon but lost contact just two minutes before touchdown. The team says a sensor that measures altitude didn’t work properly, causing the lander to descend too fast and crash. Onboard were a small rover and even a tiny model house as part of a science and art mission. This was ispace’s second failed lunar landing, but they plan to keep trying and aim for a larger NASA-backed mission in 2027. Landing on the moon is still very difficult, and this shows how tough space exploration can be, even for private companies.",
    tags: ["garlic", "salmon", "cilantro", "lemon"],
    publishedAt: "2 hours ago",
  },
  {
    author: "Plant Boy",
    avatarPicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQed510gl_CRVNTYLk-Tg3YWjp2mH4rKv6r2A&s",
    postTitle: "Smuggling Plant Diseases Is a Big Deal",
    articleSrc:
      "https://apnews.com/article/fusarium-graminearum-fungus-head-blight-china-8ce925ae96d9c437b987e58c336cd45f",
    imgSrc:
      "https://uc5a9d317681f752a4707ca16c78.previews.dropboxusercontent.com/p/thumb/ACol5ykUG1iY6b5ufMnPoaih17Eus5zrOysZpyws60EWG_dGx2FyGc8GvzoW9roGumrQxZ_vp1SJWCMes_V6hF8yj79s3s1SAKVxYqSm7wuIUXjm91Z3rGl3-X0rRFo4UxoIq1zpppKUwFg0a2NsVsall_lAiDsgObWZCBFTn57FImxMGDktk255jF07zl3G9j-I_x6OeXXO9m8BrTPYsDAQtgK4RmdxP_an8VzQzZ1hLz2D4iMuys3puLWrZz9jgydb8CLP4wH5fmggBiwD4ab1Ba2jKUUeF8jTdkMFesrJGbTdPmsMNR-xzjHnhl_3pTJ-sxKcB-v7NowvwzI3QiVokY-pexxTL2085h3lRV823OR_THna7MzZMSY2D0-aMXAWBRPxWpsPaAsYEjaN8c10/p.png?is_prewarmed=true",
    description:
      "Two researchers from China were caught bringing a harmful plant fungus into the U.S. without permission. The fungus can destroy crops like wheat, corn, and rice, and it makes food unsafe for people and animals. It’s already a problem in some parts of the U.S., but bringing in new strains without approval is illegal. Experts worry this could hurt American farms and food safety.",
    tags: ["garlic", "salmon", "cilantro", "lemon"],
    publishedAt: "3 hours ago",
  },
  {
    author: "Lord of History",
    avatarPicture:
      "https://images.stockcake.com/public/9/d/f/9df9c898-1862-49fd-86c9-1e5e76f4fbe7_large/vibrant-abstract-profile-stockcake.jpg",
    postTitle: "The Forgotten Slaves",
    articleSrc:
      "https://apnews.com/article/iraq-archaeology-basra-slave-labor-abbasid-zanj-8357ea0ca4eb1b1c2e00607c3338ddd7",
    imgSrc:
      "https://previews.dropbox.com/p/thumb/ACqdunI5AwB48n7umLE6u-ydu9Z8B3FIAI2dSA7XvjZgSTmEwZtg9vuGt7ur2Gfc7QJNOiwPW2sgB2jyCAUapjbWQjr65ogm3pUOCUe-SND6bD446kUF8maLEbhanmldVhxpUYh30txcnu7deMPel0-e8gi4X15JEktfGQHZnqMblz3iCqWbRUcviBK6ZwvBDC23xsatTD-gQjckTvgEvqQ9B5oRUS7rcFConTc9788q7Dpzd02pKHA8IRVvIDpSVOpvKh5p6JSwPz958u3RSK0efx6Er_SRGXMtal3jKu_M8dNRVZ8aexOPhsvs2pmSxgyofFRYPtz80PnSeWLas5xO/p.png?is_prewarmed=true",
    description:
      "Two archaeologists found evidence in southern Iraq showing that thousands of earthen ridges and canals were built by enslaved workers between the 9th and mid-13th centuries. These structures likely supported agriculture and were created by the Zanj, enslaved East Africans who lived under the Abbasid Caliphate. This work continued long after the Zanj Rebellion of 869–883 AD and is now recognized as an important part of Iraq’s heritage. It highlights the long-lasting contributions and overlooked history of a minority group in Basra.",
    tags: ["garlic", "salmon", "cilantro", "lemon"],
    publishedAt: "4 hours ago",
  },
];

const addedData2 = [
  {
    author: "Space Girl",
    avatarPicture:
      "https://img.stablecog.com/insecure/1920w/aHR0cHM6Ly9iLnN0YWJsZWNvZy5jb20vODJhNGE2NTctMDQ0OC00YzMxLTg3MmQtMmMwZjNjM2MzODI0LmpwZWc.webp",
    postTitle: "A New Look at the Edge of Our Solar System",
    articleSrc:
      "https://apnews.com/article/japan-moon-landing-resilience-be77f0a34032ce5a4fc524fe96888bfa",
    imgSrc:
      "https://previews.dropbox.com/p/thumb/ACqc3ClA5XoSO4WkzQQDBK1WOXQnIeVxEqyZR2Ck8KJRFcAzjVjIEIR0B__inlg579_-116Of6UGcMrBysSHv1ZjgKWvR2owFu4r1gzJBfvuSQGpm0lMF6hU2yzMKOymPPKDz72jZyZX74N8AilhQAcg5FCXaAAb76PiXPsq0G5X5rBCnm7lLy_11AI8kUkyp6fQtBsTz-ZbrI7hkS5vAPsD-mRc4U1PGYqFpBOWCALUoLvWIMk2wHAEI2bzbXVI6iMtpHBT-iZOXsrs_6E0K5hQy1NZevCMKOrRXPb-Dz9wd6DKtTmjyLeICEU23d-2lHc_ohoTOxTmuNmBCudVGJSI/p.png?is_prewarmed=true",
    description:
      "A new planetarium show takes viewers on a journey to the Oort Cloud, a distant area far beyond Pluto filled with icy objects. It’s the edge of our solar system and where many comets come from. The show uses real science and cool visuals to explain what we know — and don’t know — about this mysterious place. It’s meant to spark curiosity and help people understand how big and strange space really is.",
    tags: ["garlic", "salmon", "cilantro", "lemon"],
    publishedAt: "6 hours ago",
  },
  {
    author: "Space Girl",
    avatarPicture:
      "https://img.stablecog.com/insecure/1920w/aHR0cHM6Ly9iLnN0YWJsZWNvZy5jb20vODJhNGE2NTctMDQ0OC00YzMxLTg3MmQtMmMwZjNjM2MzODI0LmpwZWc.webp",
    postTitle: "The Storm From Above",
    articleSrc:
      "https://apnews.com/article/fusarium-graminearum-fungus-head-blight-china-8ce925ae96d9c437b987e58c336cd45f",
    imgSrc:
      "https://previews.dropbox.com/p/thumb/ACrHm-JSXC8v9XKzJi0l-U8DJexUaKentoKWROpPw5mUMPhpcCNtB_qjpR6siI7xzcaL7_gCP-51XBjWNcy0gCu81NTJPrXmdTaiGnYQwq3Kiljc_oxkn1O7LEocBHNEhnEntJhXSt79hoKV02LNtsx-MIGRVFFhyxokFN_jIFke_y6hVCwwRV3lcKWMLVVtaWXwIQli-ABnbvwumSIQOS3QdfYwKzwauaN44cZxpX6Q8bH1OM4F6Y7qV2zZ1H7XBp9iWqbyUDWRrlUASWUfcLLIMgjMFpJ3DvDwVJtKLGtYQNF_x2qXrk2aXQyEhpvgCoROiiqBwB5pRHtxbz4_spkw/p.png?is_prewarmed=true",
    description:
      "A strong solar storm might make the northern lights visible across many U.S. states tonight. This happens when energy from the sun hits Earth’s atmosphere and creates colorful lights in the sky. You might see pink, green, or blue lights in places with dark, clear skies like Alaska, Washington, or New York. The lights are best viewed away from city lights after sunset. It’s a rare and beautiful sight caused by nature.",
    tags: ["garlic", "salmon", "cilantro", "lemon"],
    publishedAt: "7 hours ago",
  },
];

const Feed = () => {
  const [posts, setPosts] = useState(initialData); // Current list of posts
  const [loading, setLoading] = useState(false); // Loading state for more posts
  const [hasMore, setHasMore] = useState(true); // Flag to indicate if more posts are available

  // Simulate fetching more posts
  const fetchMorePosts = () => {
    if (!hasMore) return;

    setLoading(true);

    setTimeout(() => {
      setPosts((prevPosts) => [...prevPosts, ...addedData2]);
      setLoading(false);

      // Example: Stop loading after 3 fetches
      if (posts.length > 30) {
        setHasMore(false);
      }
    }, 2000); // Simulate network delay
  };

  // Infinite Scroll Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && hasMore) {
          fetchMorePosts();
        }
      },
      { threshold: 1.0 }
    );

    const sentinel = document.querySelector("#infinite-scroll-sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => observer.disconnect();
  }, [loading, hasMore]);

  return (
    <Box display="flex" justifyContent={"center"}>
      <Stack maxW="xl" width="full" mt="6" mb="6" spacing="6">
        {/* <CreatePostButton /> */}

        {posts.map((post, index) => (
          <>
            <FeedPost
              articleSrc={post.articleSrc}
              publishedAt={post.publishedAt}
              author={post.author}
              key={index}
              postTitle={post.postTitle}
              imgSrc={post.imgSrc}
              description={post.description}
              avatarPicture={post.avatarPicture}
              tags={post.tags}
            />
            {index < posts.length - 1 && <Divider />}
          </>
        ))}

        {/* Sentinel for Infinite Scroll */}
        {hasMore && (
          <Box id="infinite-scroll-sentinel" textAlign="center" py={4}>
            {loading ? <Spinner size="lg" /> : "Loading more..."}
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default Feed;
