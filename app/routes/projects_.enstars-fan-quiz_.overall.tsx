import { useQuery } from "@tanstack/react-query";

import styles from "../styles/FanQuiz.module.scss";

import OverallResults from "@/components/FanQuiz/OverallResults";

import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import { createBrowserClient } from "@supabase/ssr";
import { QuizHeader } from "@/components/FanQuiz/QuizHeader";
import QuizCredit from "@/components/FanQuiz/QuizCredit";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [{ title: "overall results | what kind of enstars fan are you?" }];
};

export async function loader({ context }: LoaderFunctionArgs) {
  const env = {
    QUIZ_SUPABASE_URL: context.cloudflare.env.PUBLIC_QUIZ_SUPABASE_URL!,
    QUIZ_API_KEY: context.cloudflare.env.PUBLIC_QUIZ_API_KEY!,
  };
  return json({ env });
}

export default function EnstarsFanQuizOverall() {
  const data = useLoaderData<typeof loader>();
  const env = data.env;
  const supabase = createBrowserClient<Database>(
    env.QUIZ_SUPABASE_URL,
    env.QUIZ_API_KEY,
  );
  const {
    data: overallResultsData,
    isPending: areOverallResultsPending,
    error: overallResultsError,
  } = useQuery({
    queryKey: ["getOverallResults"],
    queryFn: async () => {
      const response = await supabase.from("purrsonality_results").select();
      return response.data;
    },
  });

  return (
    <main className={styles.page}>
      <div className={styles.container} style={{ marginBottom: "2em" }}>
        <QuizHeader title="Curious about the community's resultS...?" />
        {overallResultsData && (
          <OverallResults overallResults={overallResultsData} />
        )}
        {areOverallResultsPending && <div>loading...</div>}
        {overallResultsError && <div>could not load results :(</div>}
        <QuizCredit />
      </div>
    </main>
  );
}
