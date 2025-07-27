"use client"

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { authClient } from "@/lib/auth-client"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { PricingCard } from "../components/pricing-card"

export const UpgradeView = () => {
  const trpc = useTRPC()

  const { data: products } = useSuspenseQuery(
    trpc.premimum.getProducts.queryOptions()
  )

  const { data: currentSubscription } = useSuspenseQuery(
    trpc.premimum.getCurrentSubscription.queryOptions()
  )

  return (
    <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-10">
      <div className="mt-4 flex flex-col gap-y-10 items-center">
        <h5 className="font-medium text-2xl md:text-3xl text-center">
          You are on the{" "}
          <span className="font-semibold text-primary">
            {currentSubscription?.name ?? "Free"}
          </span>{" "}
          Plan
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {products.map((product) => {
            const isCurrentProduct = currentSubscription?.id === product.id
            const isPremium = !!currentSubscription

            let buttonText = "Upgrade"
            let onClick = () => authClient.checkout({ products: [product.id] })

            if (isCurrentProduct) {
              buttonText = "Manage"
              onClick = () => authClient.customer.portal()
            } else if (isPremium) {
              buttonText = "Change Plan"
              onClick = () => authClient.customer.portal()
            }

            const priceItem = product.prices?.[0]
            const priceAmount =
              priceItem?.amountType === "fixed"
                ? Number(priceItem.priceAmount) / 100
                : 0
            const priceSuffix = `/${priceItem?.recurringInterval ?? ""}`
            const features =
              product.benefits?.map((benefit) => benefit.description) ?? []

            return (
              <PricingCard 
                key={product.id}
                title={product.name}
                description={product.description}
                price={priceAmount}
                priceSuffix={priceSuffix}
                features={features}
                badge={product.metadata.badge as string | null}
                variant={
                  product.metadata.variant === "highlighted"
                    ? "highlighted"
                    : "default"
                }
                buttonText={buttonText}
                onClick={onClick}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const UpgradeViewLoading = () => {
  return (
    <LoadingState
      title="Loading..."
      description="This may take a few seconds"
    />
  )
}

export const UpgradeViewError = () => {
  return (
    <ErrorState
      title="Something went wrong"
      description="Please try again later"
    />
  )
}
