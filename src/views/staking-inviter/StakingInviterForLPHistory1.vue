<template>
  <div class="fill-height">
    <v-container v-if="web3 && connected" class="fill-height">
      <v-row justify="center">
        <v-col md="6">
          <!-- 操作 -->
          <v-card class="fill-width mt-10">
            <v-card outlined>
              <v-card-title>
                <v-avatar size="24" class="mr-2">
                  <img :src="require('@/assets/logo.png')" alt="DAO" />
                </v-avatar>
                <span class="title font-weight-bold text-h5">
                  {{ $t("Staking History") }}
                </span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text v-if="vestingInfoList.length > 0">
                <v-card
                  v-for="item in vestingInfoList"
                  :key="item.token"
                  :loading="loading"
                  class="ma-2"
                >
                  <v-card-title>
                    {{ $t("Staking LP Total Amount") }}:
                    {{ item.stakedAmount }}
                    {{ item.stakingTokenInfo.tokenSymbol }}
                  </v-card-title>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-text>
                    <p>
                      {{ $t("Staking Start Time") }}：{{
                        item.start | parseTime("{y}-{m}-{d} {h}:{i}:{s}")
                      }}
                    </p>
                    <p>
                      {{ $t("Staking End Time") }}：{{
                        item.end | parseTime("{y}-{m}-{d} {h}:{i}:{s}")
                      }}
                    </p>
                    <p>
                      {{ $t("Staking Duration") }}：{{
                        item.duration | formatSeconds()
                      }}
                    </p>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">
                              {{ $t("Staking Rewards Token") }}
                            </th>
                            <th class="text-left">
                              {{ $t("Receive Amount") }}
                            </th>
                            <th class="text-left">
                              {{ $t("Releasable Amount") }}
                            </th>
                            <th class="text-left">
                              {{ $t("Released Amount") }}
                            </th>
                            <th class="text-left">{{ $t("Operation") }}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="stakingTokenItem in item.releaseTokenList"
                            :key="stakingTokenItem.token"
                          >
                            <td>{{ stakingTokenItem.symbol }}</td>
                            <td>
                              {{ stakingTokenItem.receiveAmount }}
                            </td>
                            <td>{{ stakingTokenItem.releasableAmount }}</td>
                            <td>{{ stakingTokenItem.releasedAmount }}</td>
                            <td>
                              <v-btn
                                v-if="stakingTokenItem.releasableAmount > 0"
                                small
                                color="#93B954"
                                dark
                                width="80%"
                                @click="handleRelease(stakingTokenItem)"
                              >
                                {{ $t("Claim") }}
                              </v-btn>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-actions class="justify-center">
                    <v-btn
                      v-if="
                        item.stakingTokenInfo.isToReleaseTime &&
                          item.stakingTokenInfo.releasableAmount > 0
                      "
                      color="#93B954"
                      dark
                      width="80%"
                      @click="handleRelease(item.stakingTokenInfo)"
                    >
                      {{ $t("Claim Staking") }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-card-text>
              <v-card-text v-else>
                <v-row align="center">
                  <v-col class="body-3" cols="12">
                    {{ $t("No Data") }}
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-card>
          <!-- 当前钱包账号 -->
          <v-card justify="center" class="fill-width mt-10">
            <v-card-title>
              <span class="title font-weight-bold text-h5">
                {{ $t("Current Token Address") }}
              </span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row align="center">
                <v-col
                  class="body-1"
                  cols="12"
                  @click="handleCopy(address, $event)"
                >
                  <p>
                    {{ address }}
                    <v-icon>mdi-content-copy</v-icon>
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <!-- 官方说明 -->
          <v-card justify="center" class="fill-width mt-10">
            <v-card-text>
              <v-row align="center">
                <v-col class="body-1" cols="12">
                  <p @click="handleCopy(DAOAddress, $event)">
                    DAO contract: {{ DAOAddress }}
                    <v-icon>mdi-content-copy</v-icon>
                  </p>
                  <p @click="handleCopy(DSTAddress, $event)">
                    DST contract: {{ DSTAddress }}
                    <v-icon>mdi-content-copy</v-icon>
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <!-- 遮罩层 -->
          <v-overlay z-index="9999" opacity="0.7" :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-overlay>
          <!-- 提示层 -->
          <v-snackbar
            v-model="operationResult.snackbar"
            :color="operationResult.color"
            centered
            top
            timeout="4000"
          >
            {{ $t(operationResult.text) }}
          </v-snackbar>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row justify="center">
        <v-col md="6">
          <v-card justify="center" class="fill-width">
            <v-card-actions class="justify-center">
              <!-- 连接钱包 -->
              <v-btn
                class="mr-2"
                v-if="!connected"
                color="#93B954"
                block
                @click="onConnect"
              >
                {{ $t("Connect Wallet") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { JSBI } from "@/utils/jsbi";
import clip from "@/utils/clipboard";
import {
  DAOAddress,
  DSTAddress,
  StakingInviterForLPContractAddress1
} from "@/constants";
import { getContractByABI, weiToEther, toChecksumAddress } from "@/utils/web3";
import { compare } from "@/filters/index";
// 引入合约 ABI 文件
import ERC20DAO_ABI from "@/constants/contractJson/ERC20DAO_abi.json";
import StakingInviter_ABI from "@/constants/contractJson/StakingInviter_abi.json";
import TokenVesting_ABI from "@/constants/contractJson/TokenVesting_abi.json";

export default {
  name: "StakingInviterForLPHistory1",
  data: () => ({
    DAOAddress,
    DSTAddress,
    loading: false,
    // 当前账户相关信息
    accountAssets: {
      tokenVestingAddressList: []
    },
    // 合约信息
    contractInfo: {
      rewardsRateInfoList: []
    },
    // 释放合约列表
    vestingInfoList: [],
    // 提示框
    operationResult: {
      color: "success",
      snackbar: false,
      text: `Hello`
    }
  }),
  created() {
    if (this.web3 && this.connected) {
      this.getInfo();
    } else {
      this.onConnect();
    }
  },
  watch: {
    web3(web3) {
      if (web3) {
        this.getInfo();
      }
    },
    address(address) {
      if (address) {
        this.getInfo();
      }
    }
  },
  computed: {
    connected() {
      return this.$store.state.web3.connected;
    },
    web3() {
      return this.$store.state.web3.web3;
    },
    address() {
      return this.$store.state.web3.address;
    }
  },
  methods: {
    // 连接钱包 OK
    onConnect() {
      this.$store.dispatch("web3/connect");
    },
    // 断开连接钱包 OK
    closeWallet() {
      this.$store.dispatch("web3/closeWallet");
    },
    // 复制地址
    handleCopy(text, event) {
      clip(text, event);
      this.operationResult.color = "success";
      this.operationResult.snackbar = true;
      this.operationResult.text = "Cope Success";
    },
    // 获取信息
    async getInfo() {
      this.loading = true;
      try {
        await this.getAccountAssets();
        await this.getContractInfo();
        await this.getTokenVestingInfo();
      } catch (error) {
        console.info(error);
      }
      this.loading = false;
    },
    // 获取账号信息
    async getAccountAssets() {
      const contract = getContractByABI(
        StakingInviter_ABI,
        StakingInviterForLPContractAddress1,
        this.web3
      );
      this.accountAssets.tokenVestingAddressList = await contract.methods
        .getTokenVestingAddressByAccount(this.address)
        .call();
    },
    // 获取质押合约信息
    async getContractInfo() {
      const contract = getContractByABI(
        StakingInviter_ABI,
        StakingInviterForLPContractAddress1,
        this.web3
      );
      const rewardsRateInfoList = await contract.methods
        .getRewardsTokenList()
        .call({ from: this.currentAccount });
      this.contractInfo.rewardsRateInfoList = [];
      if (rewardsRateInfoList.length > 0) {
        const getResult = rewardsRateInfoList.map(async item => {
          const contractForERC20 = await getContractByABI(
            ERC20DAO_ABI,
            item,
            this.web3
          );
          const ERC20Name = await contractForERC20.methods.name().call();
          const ERC20Symbol = await contractForERC20.methods.symbol().call();
          const rewardsRateInfo = await contract.methods
            .rewardsRateInfoList(toChecksumAddress(item))
            .call();
          const rewardsRateItem = {
            token: item,
            rate: rewardsRateInfo.rewardsRate,
            name: ERC20Name,
            symbol: ERC20Symbol
          };
          this.contractInfo.rewardsRateInfoList.push(rewardsRateItem);
        });
        await Promise.all(getResult);
      }
    },
    // 获取释放合约信息
    async getTokenVestingInfo() {
      // 生成列表
      this.vestingInfoList = [];
      if (this.accountAssets.tokenVestingAddressList.length > 0) {
        const getResult = this.accountAssets.tokenVestingAddressList.map(
          async item => {
            const contract = await getContractByABI(
              TokenVesting_ABI,
              item,
              this.web3
            );
            // 查询数据
            const stakingToken = await contract.methods.stakingToken().call();
            const staker = await contract.methods.staker().call();
            const start = await contract.methods.start().call();
            const duration = await contract.methods.duration().call();
            const stakedAmount = await contract.methods.stakedAmount().call();
            const stakedAmountFormat = weiToEther(stakedAmount, this.web3);
            // staking token info
            const contractForERC20 = await getContractByABI(
              ERC20DAO_ABI,
              stakingToken,
              this.web3
            );
            const stakingTokenName = await contractForERC20.methods
              .name()
              .call();
            const stakingTokenSymbol = await contractForERC20.methods
              .symbol()
              .call();
            const stakingTokenInfoReleasedAmount = await contract.methods
              .released(stakingToken)
              .call({ from: this.currentAccount });
            const stakingTokenInfoReleasableAmount = await contract.methods
              .releasableAmount(stakingToken)
              .call({ from: this.currentAccount });
            const stakingTokenInfoIsToReleaseTime = await contract.methods
              .isToReleaseTime()
              .call({ from: this.currentAccount });
            const stakingTokenInfo = {
              contractAddress: item,
              token: stakingToken,
              tokenName: stakingTokenName,
              tokenSymbol: stakingTokenSymbol,
              releasedAmount: weiToEther(
                stakingTokenInfoReleasedAmount,
                this.web3
              ),
              releasableAmount: weiToEther(
                stakingTokenInfoReleasableAmount,
                this.web3
              ),
              isToReleaseTime: stakingTokenInfoIsToReleaseTime
            };
            // 获取奖励代币信息
            const releaseTokenList = [];
            if (this.contractInfo.rewardsRateInfoList.length > 0) {
              const getResultForRelease = this.contractInfo.rewardsRateInfoList.map(
                async rewardsRateInfo => {
                  const contractForERC20 = await getContractByABI(
                    ERC20DAO_ABI,
                    rewardsRateInfo.token,
                    this.web3
                  );
                  // 代币余额
                  const tempInfoBalance = await contractForERC20.methods
                    .balanceOf(item)
                    .call();
                  const tempInfoBalanceFormat = weiToEther(
                    tempInfoBalance,
                    this.web3
                  );
                  // 已提取数量
                  const tempInfoReleasedAmount = await contract.methods
                    .released(rewardsRateInfo.token)
                    .call({ from: this.currentAccount });
                  // 可提取数量
                  const tempInfoReleasableAmount = await contract.methods
                    .releasableAmount(rewardsRateInfo.token)
                    .call({ from: this.currentAccount });
                  // 计算收到奖励数量
                  let calcReceiveableAmount = JSBI.BigInt(tempInfoBalance);
                  if (rewardsRateInfo.token === stakingToken) {
                    calcReceiveableAmount = JSBI.subtract(
                      calcReceiveableAmount,
                      JSBI.BigInt(stakedAmount)
                    );
                  }
                  const calcReceiveAmount = JSBI.add(
                    calcReceiveableAmount,
                    JSBI.BigInt(tempInfoReleasedAmount)
                  );
                  const calcReleasedAmount = JSBI.lessThan(
                    calcReceiveAmount,
                    JSBI.BigInt(tempInfoReleasedAmount)
                  )
                    ? parseFloat(calcReceiveAmount)
                    : JSBI.BigInt(tempInfoReleasedAmount);
                  const calcReleasableAmount = JSBI.lessThan(
                    calcReceiveAmount,
                    JSBI.BigInt(tempInfoReleasableAmount)
                  )
                    ? JSBI.subtract(calcReceiveAmount, calcReleasedAmount)
                    : JSBI.BigInt(tempInfoReleasableAmount);
                  // 封装奖励代币信息
                  const tempInfo = {
                    contractAddress: item,
                    token: rewardsRateInfo.token,
                    rate: rewardsRateInfo.rewardsRate,
                    name: rewardsRateInfo.name,
                    symbol: rewardsRateInfo.symbol,
                    balance: tempInfoBalanceFormat,
                    releasedAmount: weiToEther(
                      calcReleasedAmount.toString(),
                      this.web3
                    ),
                    releasableAmount: weiToEther(
                      calcReleasableAmount.toString(),
                      this.web3
                    ),
                    receiveAmount: weiToEther(
                      calcReceiveAmount.toString(),
                      this.web3
                    )
                  };
                  if (tempInfo.receiveAmount > 0) {
                    releaseTokenList.push(tempInfo);
                  }
                }
              );
              await Promise.all(getResultForRelease);
            }
            // 组装对象
            releaseTokenList.sort(compare("token"));
            const tempVesting = {
              contractAddress: item,
              stakingToken: stakingToken,
              staker: staker,
              start: start,
              duration: duration,
              end: parseInt(start) + parseInt(duration),
              stakedAmount: stakedAmountFormat,
              stakingTokenInfo: stakingTokenInfo,
              releaseTokenList: releaseTokenList
            };
            this.vestingInfoList.push(tempVesting);
          }
        );
        await Promise.all(getResult);
        this.vestingInfoList.sort(compare("start"));
      }
    },
    // 提取
    handleRelease(record) {
      this.loading = true;
      // 执行合约
      getContractByABI(TokenVesting_ABI, record.contractAddress, this.web3)
        .methods.release(record.token)
        .send({ from: this.address })
        .then(() => {
          this.loading = false;
          this.operationResult.snackbar = true;
          this.operationResult.text = "Claim Success";
          this.getInfo();
        })
        .catch(e => {
          this.loading = false;
          console.info(e);
        });
    }
  }
};
</script>

<style lang="sass">
.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg
  background-color: rgb(147, 185, 84) !important
  border-color: rgb(147, 185, 84) !important
  opacity: 0.5 !important

.v-btn--disabled
  background-color: rgb(147, 185, 84)
  border-color: rgb(147, 185, 84)
  opacity: 0.5
</style>
