export type Lang = "pt" | "en";

export interface Strings {
  nav: {
    siteTitle: string;
    home: string;
    abTest: string;
    power: string;
    aiData: string;
    causation: string;
    langLabel: string;
    themeLabel: string;
    lightMode: string;
    darkMode: string;
    previous: string;
    next: string;
    backToIndex: string;
  };
  home: {
    heroKicker: string;
    heroTitle: string;
    heroSubtitle: string;
    conceptsHeading: string;
    badgeInteractive: string;
    badgeComingSoon: string;
    cards: {
      abTest: { title: string; description: string };
      significance: { title: string; description: string };
      aiData: { title: string; description: string };
      causation: { title: string; description: string };
    };
  };
  abTest: {
    title: string;
    intro: string;
    controlsHeading: string;
    baselineLabel: string;
    baselineHint: string;
    variantLabel: string;
    variantHint: string;
    sampleSizeLabel: string;
    sampleSizeHint: string;
    alphaLabel: string;
    alphaHint: string;
    resultsHeading: string;
    verdictSignificant: string;
    verdictNotSignificant: string;
    verdictSignificantSub: string;
    verdictNotSignificantSub: string;
    observedDiff: string;
    relativeLift: string;
    pValue: string;
    confidenceInterval: string;
    zScore: string;
    conversionsControl: string;
    conversionsVariant: string;
    chartHeading: string;
    chartCaption: string;
    chartObserved: string;
    chartCritical: string;
    explanationHeading: string;
    explanation: string[];
    perGroup: string;
  };
  aiData: {
    title: string;
    intro: string;
    flywheelHeading: string;
    flywheelIntro: string;
    stages: { usage: string; data: string; model: string; product: string };
    speedLabel: string;
    loopStrengthLabel: string;
    loopStrengthHint: string;
    dataQualityLabel: string;
    dataQualityHint: string;
    multiplierLabel: string;
    doublingLabel: string;
    doublingNever: string;
    cyclesUnit: string;
    verdictStrong: string;
    verdictWeak: string;
    verdictStalled: string;
    chartWithFlywheel: string;
    chartWithoutFlywheel: string;
    chartXAxis: string;
    sections: { title: string; body: string }[];
  };
  power: {
    title: string;
    intro: string;
    controlsHeading: string;
    baselineLabel: string;
    baselineHint: string;
    mdeLabel: string;
    mdeHint: string;
    alphaLabel: string;
    alphaHint: string;
    sampleSizeLabel: string;
    sampleSizeHint: string;
    targetPowerLabel: string;
    targetPowerHint: string;
    resultsHeading: string;
    achievedPowerLabel: string;
    requiredNLabel: string;
    totalNLabel: string;
    detectingLabel: string;
    verdictWellPowered: string;
    verdictUnderpowered: string;
    chartHeading: string;
    chartCaption: string;
    chartLegendPower: string;
    chartLegendAlpha: string;
    chartLegendBeta: string;
    chartH0: string;
    chartH1: string;
    explanationHeading: string;
    explanation: string[];
    perGroup: string;
  };
  causation: {
    title: string;
    intro: string;
    confounderLabel: string;
    confounderHint: string;
    revealLabel: string;
    aggregateRLabel: string;
    withinRLabel: string;
    xAxisLabel: string;
    yAxisLabel: string;
    verdictSpurious: string;
    verdictNeutral: string;
    legendGroups: string;
    explanationHeading: string;
    explanation: string[];
  };
}

const pt: Strings = {
  nav: {
    siteTitle: "Conceitos de Dados",
    home: "Início",
    abTest: "Teste A/B",
    power: "Poder",
    aiData: "Dados & IA",
    causation: "Causalidade",
    langLabel: "Idioma",
    themeLabel: "Tema",
    lightMode: "Modo claro",
    darkMode: "Modo escuro",
    previous: "Anterior",
    next: "Próximo",
    backToIndex: "Todos os conceitos",
  },
  home: {
    heroKicker: "Aprenda explorando",
    heroTitle: "Conceitos de dados que toda startup deveria dominar",
    heroSubtitle:
      "Explicações interativas dos fundamentos de dados — manipule os números, veja a estatística reagir e construa intuição de verdade, não só fórmulas.",
    conceptsHeading: "Conceitos",
    badgeInteractive: "Interativo",
    badgeComingSoon: "Em breve",
    cards: {
      abTest: {
        title: "Teste A/B & Significância",
        description:
          "Ajuste taxas de conversão e tamanho de amostra e veja ao vivo o p-valor, o intervalo de confiança e se o resultado é estatisticamente significativo.",
      },
      significance: {
        title: "Poder Estatístico & Tamanho de Amostra",
        description:
          "Quantos usuários você precisa para detectar um efeito? Visualize o trade-off entre poder, effect size e erro.",
      },
      aiData: {
        title: "Dados na Era dos Agentes de IA",
        description:
          "Por que dados são o ativo central: o data flywheel, qualidade, avaliação contínua (evals) e o que muda quando agentes consomem seus dados.",
      },
      causation: {
        title: "Correlação ≠ Causalidade",
        description:
          "Por que duas métricas que sobem juntas não provam causa — e como um confounder escondido fabrica correlações 'fortes'.",
      },
    },
  },
  abTest: {
    title: "Simulador de Teste A/B",
    intro:
      "Um teste A/B compara duas versões (controle e variante) para decidir se a diferença observada é real ou apenas ruído. Mexa nos controles e observe como a evidência estatística muda.",
    controlsHeading: "Parâmetros",
    baselineLabel: "Taxa de conversão do controle",
    baselineHint: "A taxa de conversão atual (versão A).",
    variantLabel: "Taxa de conversão da variante",
    variantHint: "A taxa de conversão da nova versão (B).",
    sampleSizeLabel: "Tamanho da amostra por grupo",
    sampleSizeHint: "Número de usuários em cada variante (divisão 50/50).",
    alphaLabel: "Nível de significância (α)",
    alphaHint: "Risco aceito de falso positivo (erro tipo I).",
    resultsHeading: "Resultado",
    verdictSignificant: "Diferença estatisticamente significativa",
    verdictNotSignificant: "Diferença NÃO significativa",
    verdictSignificantSub:
      "É improvável que essa diferença seja só acaso ao nível α escolhido — há evidência de que a variante é diferente.",
    verdictNotSignificantSub:
      "A diferença observada poderia facilmente ser fruto do acaso. Não há evidência suficiente para declarar a variante vencedora.",
    observedDiff: "Diferença absoluta",
    relativeLift: "Lift relativo",
    pValue: "p-valor",
    confidenceInterval: "Intervalo de confiança",
    zScore: "Estatística z",
    conversionsControl: "Conversões (controle)",
    conversionsVariant: "Conversões (variante)",
    chartHeading: "Distribuição sob a hipótese nula",
    chartCaption:
      "Se não houvesse diferença real, a estatística z se distribuiria assim. As áreas sombreadas são o p-valor: a chance de ver um resultado tão extremo quanto o seu por puro acaso.",
    chartObserved: "z observado",
    chartCritical: "limite crítico",
    explanationHeading: "Como interpretar",
    explanation: [
      "O p-valor é a probabilidade de observar uma diferença tão grande quanto a sua se, na verdade, não houvesse diferença nenhuma. p-valor pequeno = resultado surpreendente sob a hipótese de 'nenhum efeito'.",
      "Significância (p < α) não mede o tamanho do efeito. Com amostra enorme, diferenças minúsculas viram 'significativas'; olhe sempre o lift relativo e o intervalo de confiança.",
      "O intervalo de confiança mostra a faixa plausível para a diferença real. Se ele cruza o zero, a variante pode até ser pior — cuidado ao declarar vitória.",
    ],
    perGroup: "por grupo",
  },
  aiData: {
    title: "Dados na Era dos Agentes de IA",
    intro:
      "Modelos e agentes viraram commodity — qualquer um chama a mesma API. O que diferencia uma empresa é o ativo que ninguém copia: seus dados e o ciclo que os transforma em produto melhor. Gire o volante abaixo e veja por que isso decide quem vence.",
    flywheelHeading: "O Data Flywheel",
    flywheelIntro:
      "Uso gera dados → dados melhoram o modelo → o modelo melhora o produto → o produto atrai mais uso. Quando esse ciclo se fecha sozinho, cada volta vale mais que a anterior: crescimento composto, não linear.",
    stages: { usage: "Uso", data: "Dados", model: "Modelo", product: "Produto" },
    speedLabel: "giro",
    loopStrengthLabel: "Força do loop",
    loopStrengthHint:
      "O quanto cada interação realimenta o ciclo — retenção, feedback do usuário, automação.",
    dataQualityLabel: "Qualidade dos dados",
    dataQualityHint:
      "Dados ruins quebram o ciclo: lixo entra, lixo sai — por melhor que seja o loop.",
    multiplierLabel: "Valor após 12 ciclos",
    doublingLabel: "Tempo para dobrar",
    doublingNever: "não dobra",
    cyclesUnit: "ciclos",
    verdictStrong: "O volante gira sozinho — crescimento composto.",
    verdictWeak: "O volante gira devagar — o efeito composto mal aparece.",
    verdictStalled:
      "O volante trava — sem dados bons ou sem loop, não há retorno composto.",
    chartWithFlywheel: "com volante",
    chartWithoutFlywheel: "sem volante",
    chartXAxis: "ciclos",
    sections: [
      {
        title: "Lixo entra, lixo sai",
        body: "Um flywheel só compõe se os dados que o alimentam forem confiáveis. Contratos de dados, instrumentação proposital e qualidade na origem são o que mantém o ciclo girando — não um modelo maior.",
      },
      {
        title: "Avaliação contínua (evals)",
        body: "Sistemas de IA são não-determinísticos e degradam em silêncio. Sem evals — conjuntos de referência e rubricas medindo a qualidade a cada mudança — você só descobre a regressão quando o usuário descobre. Não se melhora o que não se mede.",
      },
      {
        title: "O que muda com agentes",
        body: "Agentes consomem seus dados sem interface humana: precisam ser legíveis por máquina, estruturados e com semântica explícita. A camada semântica e os contratos deixam de ser luxo de analytics e viram pré-requisito para o agente agir certo.",
      },
    ],
  },
  power: {
    title: "Poder Estatístico & Tamanho de Amostra",
    intro:
      "Antes de rodar um teste, a pergunta certa não é 'deu significativo?' — é 'tenho amostra suficiente para detectar um efeito que importa?'. Poder é a chance de enxergar um efeito real quando ele existe. Ajuste os controles e veja de quantos usuários você precisa.",
    controlsHeading: "Parâmetros",
    baselineLabel: "Taxa de conversão base",
    baselineHint: "A conversão atual do controle.",
    mdeLabel: "Efeito mínimo detectável (lift)",
    mdeHint:
      "O menor ganho relativo que vale a pena detectar. Efeitos menores exigem amostras muito maiores.",
    alphaLabel: "Nível de significância (α)",
    alphaHint: "Risco de falso positivo (erro tipo I).",
    sampleSizeLabel: "Tamanho da amostra por grupo",
    sampleSizeHint: "Usuários em cada variante. Mais amostra → mais poder.",
    targetPowerLabel: "Poder desejado",
    targetPowerHint: "Chance de detectar o efeito se ele for real (1 − β).",
    resultsHeading: "Resultado",
    achievedPowerLabel: "Poder com essa amostra",
    requiredNLabel: "n por grupo p/ o poder desejado",
    totalNLabel: "Amostra total (2 grupos)",
    detectingLabel: "Detectando",
    verdictWellPowered: "Amostra suficiente — o teste enxerga o efeito.",
    verdictUnderpowered: "Amostra insuficiente — teste provavelmente cego a um efeito real.",
    chartHeading: "Poder = separação entre as duas hipóteses",
    chartCaption:
      "A curva da esquerda é o mundo sem efeito (H₀); a da direita, o mundo com o efeito (H₁). À direita do limite crítico: verde = poder (detecta o efeito), vermelho = falso positivo (α). À esquerda, sob H₁: âmbar = β (deixa passar).",
    chartLegendPower: "poder (1−β)",
    chartLegendAlpha: "α",
    chartLegendBeta: "β",
    chartH0: "H₀ (sem efeito)",
    chartH1: "H₁ (com efeito)",
    explanationHeading: "Como interpretar",
    explanation: [
      "Poder baixo = teste cego: o efeito existe, mas a amostra é pequena demais para distingui-lo do ruído. Você conclui 'sem diferença' por engano (erro tipo II).",
      "Efeitos pequenos custam caro: detectar +5% relativo pode exigir várias vezes mais amostra que +10%. Defina o efeito mínimo que importa para o negócio antes de dimensionar.",
      "Decida o tamanho da amostra ANTES de rodar. Espiar o resultado e parar quando 'deu significativo' (peeking) infla o falso positivo.",
    ],
    perGroup: "por grupo",
  },
  causation: {
    title: "Correlação ≠ Causalidade",
    intro:
      "Duas métricas que sobem juntas não provam que uma causa a outra. Quase sempre há uma terceira variável escondida — um confounder — movendo as duas. Aumente a força do confounder e veja uma correlação 'forte' surgir do nada.",
    confounderLabel: "Força do confounder",
    confounderHint:
      "O quanto uma variável escondida (ex.: perfil do usuário) empurra as duas métricas ao mesmo tempo.",
    revealLabel: "Colorir por grupo (revelar o confounder)",
    aggregateRLabel: "Correlação observada (r)",
    withinRLabel: "Correlação dentro dos grupos (r)",
    xAxisLabel: "Uso da feature X",
    yAxisLabel: "Retenção",
    verdictSpurious:
      "Correlação forte — e enganosa. Dentro de cada grupo não há relação; o confounder cria a ilusão.",
    verdictNeutral: "Pouca correlação: sem um confounder forte, as métricas não andam juntas.",
    legendGroups: "grupos (confounder)",
    explanationHeading: "Como interpretar",
    explanation: [
      "A correlação agregada pode ser alta só porque cada grupo está numa posição diferente — não porque X cause Y. Colorir por grupo revela que, dentro de cada um, a relação some.",
      "É o paradoxo de Simpson: a tendência do todo pode sumir ou até inverter quando você controla pela variável certa. Ler métricas agregadas sem segmentar engana.",
      "A forma confiável de afirmar causa é o experimento controlado (teste A/B): randomizar quebra o vínculo com o confounder. Por isso experimento vale mais que observação.",
    ],
  },
};

const en: Strings = {
  nav: {
    siteTitle: "Data Concepts",
    home: "Home",
    abTest: "A/B Test",
    power: "Power",
    aiData: "Data & AI",
    causation: "Causation",
    langLabel: "Language",
    themeLabel: "Theme",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    previous: "Previous",
    next: "Next",
    backToIndex: "All concepts",
  },
  home: {
    heroKicker: "Learn by exploring",
    heroTitle: "Data concepts every startup should master",
    heroSubtitle:
      "Interactive explanations of data fundamentals — drag the numbers, watch the statistics react, and build real intuition instead of memorizing formulas.",
    conceptsHeading: "Concepts",
    badgeInteractive: "Interactive",
    badgeComingSoon: "Coming soon",
    cards: {
      abTest: {
        title: "A/B Testing & Significance",
        description:
          "Adjust conversion rates and sample size and watch the p-value, confidence interval, and statistical significance update live.",
      },
      significance: {
        title: "Statistical Power & Sample Size",
        description:
          "How many users do you need to detect an effect? Visualize the trade-off between power, effect size, and error.",
      },
      aiData: {
        title: "Data in the Age of AI Agents",
        description:
          "Why data is the core asset: the data flywheel, quality, continuous evaluation (evals), and what changes when agents consume your data.",
      },
      causation: {
        title: "Correlation ≠ Causation",
        description:
          "Why two metrics rising together don't prove cause — and how a hidden confounder fabricates 'strong' correlations.",
      },
    },
  },
  abTest: {
    title: "A/B Test Simulator",
    intro:
      "An A/B test compares two versions (control and variant) to decide whether an observed difference is real or just noise. Move the controls and watch how the statistical evidence changes.",
    controlsHeading: "Parameters",
    baselineLabel: "Control conversion rate",
    baselineHint: "The current conversion rate (version A).",
    variantLabel: "Variant conversion rate",
    variantHint: "The conversion rate of the new version (B).",
    sampleSizeLabel: "Sample size per group",
    sampleSizeHint: "Number of users in each variant (50/50 split).",
    alphaLabel: "Significance level (α)",
    alphaHint: "Accepted false-positive risk (type I error).",
    resultsHeading: "Result",
    verdictSignificant: "Statistically significant difference",
    verdictNotSignificant: "NOT a significant difference",
    verdictSignificantSub:
      "This difference is unlikely to be pure chance at the chosen α — there is evidence the variant is different.",
    verdictNotSignificantSub:
      "The observed difference could easily be due to chance. Not enough evidence to call the variant a winner.",
    observedDiff: "Absolute difference",
    relativeLift: "Relative lift",
    pValue: "p-value",
    confidenceInterval: "Confidence interval",
    zScore: "z statistic",
    conversionsControl: "Conversions (control)",
    conversionsVariant: "Conversions (variant)",
    chartHeading: "Distribution under the null hypothesis",
    chartCaption:
      "If there were no real difference, the z statistic would be distributed like this. The shaded areas are the p-value: the chance of seeing a result as extreme as yours by pure luck.",
    chartObserved: "observed z",
    chartCritical: "critical bound",
    explanationHeading: "How to read it",
    explanation: [
      "The p-value is the probability of observing a difference as large as yours if there were actually no difference at all. Small p-value = surprising result under the 'no effect' assumption.",
      "Significance (p < α) does not measure effect size. With a huge sample, tiny differences become 'significant'; always look at the relative lift and the confidence interval.",
      "The confidence interval shows the plausible range for the true difference. If it crosses zero, the variant might even be worse — be careful before declaring victory.",
    ],
    perGroup: "per group",
  },
  aiData: {
    title: "Data in the Age of AI Agents",
    intro:
      "Models and agents have become a commodity — anyone can call the same API. What sets a company apart is the asset no one can copy: your data and the loop that turns it into a better product. Spin the flywheel below and see why it decides who wins.",
    flywheelHeading: "The Data Flywheel",
    flywheelIntro:
      "Usage generates data → data improves the model → the model improves the product → the product attracts more usage. When that loop closes on its own, each turn is worth more than the last: compounding growth, not linear.",
    stages: { usage: "Usage", data: "Data", model: "Model", product: "Product" },
    speedLabel: "spin",
    loopStrengthLabel: "Loop strength",
    loopStrengthHint:
      "How much each interaction feeds back into the cycle — retention, user feedback, automation.",
    dataQualityLabel: "Data quality",
    dataQualityHint:
      "Bad data breaks the loop: garbage in, garbage out — no matter how good the loop is.",
    multiplierLabel: "Value after 12 cycles",
    doublingLabel: "Time to double",
    doublingNever: "never doubles",
    cyclesUnit: "cycles",
    verdictStrong: "The flywheel spins on its own — compounding growth.",
    verdictWeak: "The flywheel turns slowly — compounding barely shows.",
    verdictStalled:
      "The flywheel stalls — without good data or a real loop, there is no compounding.",
    chartWithFlywheel: "with flywheel",
    chartWithoutFlywheel: "without flywheel",
    chartXAxis: "cycles",
    sections: [
      {
        title: "Garbage in, garbage out",
        body: "A flywheel only compounds if the data feeding it is trustworthy. Data contracts, deliberate instrumentation, and quality at the source are what keep it spinning — not a bigger model.",
      },
      {
        title: "Continuous evaluation (evals)",
        body: "AI systems are non-deterministic and degrade silently. Without evals — reference sets and rubrics measuring quality on every change — you only catch the regression when your users do. You can't improve what you don't measure.",
      },
      {
        title: "What changes with agents",
        body: "Agents consume your data with no human in the loop: it must be machine-readable, structured, and explicitly semantic. The semantic layer and data contracts stop being an analytics luxury and become a prerequisite for the agent to act correctly.",
      },
    ],
  },
  power: {
    title: "Statistical Power & Sample Size",
    intro:
      "Before running a test, the right question isn't 'is it significant?' — it's 'do I have enough sample to detect an effect that matters?'. Power is the chance of seeing a real effect when it exists. Adjust the controls and see how many users you need.",
    controlsHeading: "Parameters",
    baselineLabel: "Baseline conversion rate",
    baselineHint: "The control's current conversion.",
    mdeLabel: "Minimum detectable effect (lift)",
    mdeHint:
      "The smallest relative gain worth detecting. Smaller effects require much larger samples.",
    alphaLabel: "Significance level (α)",
    alphaHint: "False-positive risk (type I error).",
    sampleSizeLabel: "Sample size per group",
    sampleSizeHint: "Users in each variant. More sample → more power.",
    targetPowerLabel: "Target power",
    targetPowerHint: "Chance of detecting the effect if it is real (1 − β).",
    resultsHeading: "Result",
    achievedPowerLabel: "Power at this sample",
    requiredNLabel: "n per group for target power",
    totalNLabel: "Total sample (2 groups)",
    detectingLabel: "Detecting",
    verdictWellPowered: "Enough sample — the test can see the effect.",
    verdictUnderpowered: "Not enough sample — the test is likely blind to a real effect.",
    chartHeading: "Power = separation between the two hypotheses",
    chartCaption:
      "The left curve is the world with no effect (H₀); the right one, the world with the effect (H₁). Right of the critical bound: green = power (detects the effect), red = false positive (α). Left, under H₁: amber = β (misses it).",
    chartLegendPower: "power (1−β)",
    chartLegendAlpha: "α",
    chartLegendBeta: "β",
    chartH0: "H₀ (no effect)",
    chartH1: "H₁ (effect)",
    explanationHeading: "How to read it",
    explanation: [
      "Low power = blind test: the effect exists, but the sample is too small to tell it from noise. You wrongly conclude 'no difference' (type II error).",
      "Small effects are expensive: detecting +5% relative can require several times more sample than +10%. Decide the minimum effect that matters to the business before sizing.",
      "Decide the sample size BEFORE running. Peeking at results and stopping when it 'turns significant' inflates the false-positive rate.",
    ],
    perGroup: "per group",
  },
  causation: {
    title: "Correlation ≠ Causation",
    intro:
      "Two metrics rising together don't prove one causes the other. There's almost always a hidden third variable — a confounder — moving both. Increase the confounder's strength and watch a 'strong' correlation appear out of nowhere.",
    confounderLabel: "Confounder strength",
    confounderHint:
      "How much a hidden variable (e.g. user profile) pushes both metrics at the same time.",
    revealLabel: "Color by group (reveal the confounder)",
    aggregateRLabel: "Observed correlation (r)",
    withinRLabel: "Within-group correlation (r)",
    xAxisLabel: "Feature X usage",
    yAxisLabel: "Retention",
    verdictSpurious:
      "Strong correlation — and misleading. Within each group there's no relationship; the confounder creates the illusion.",
    verdictNeutral: "Little correlation: without a strong confounder, the metrics don't move together.",
    legendGroups: "groups (confounder)",
    explanationHeading: "How to read it",
    explanation: [
      "The aggregate correlation can be high just because each group sits in a different spot — not because X causes Y. Coloring by group reveals that, within each one, the relationship vanishes.",
      "This is Simpson's paradox: the overall trend can vanish or even reverse once you control for the right variable. Reading aggregate metrics without segmenting misleads.",
      "The reliable way to claim causation is a controlled experiment (A/B test): randomization breaks the link with the confounder. That's why experiments beat observation.",
    ],
  },
};

export const dictionary: Record<Lang, Strings> = { pt, en };
